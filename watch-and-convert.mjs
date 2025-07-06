// watch-and-convert.mjs
import chokidar from 'chokidar';
import sharp from 'sharp';
import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'src-images');
const outputDir = path.join(__dirname, 'public', 'images');
const manifestPath = path.join(__dirname, 'src', 'images.json');
const sizes = [320, 768];  // Solo 320 y 768
const format = 'avif';

// Opciones para AVIF (calidad alta y buena compresión)
const avifOptions = {
  quality: 75,
  effort: 5,
  chromaSubsampling: '4:4:4',
  lossless: false,
};

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(path.dirname(manifestPath), { recursive: true });

let manifest = {};
if (fssync.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
  } catch {
    manifest = {};
  }
}

async function saveManifest() {
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
}

async function generatedFilesExist(generatedPaths) {
  for (const size of sizes) {
    const filepath = generatedPaths?.[size]?.[format];
    if (!filepath) return false;
    if (!fssync.existsSync(path.join(outputDir, filepath))) {
      return false;
    }
  }
  return true;
}

async function processImage(filePath) {
  const relativePath = path.relative(inputDir, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const folderPath = path.dirname(relativePath);
  const fileName = path.basename(filePath);
  const outputFolder = path.join(outputDir, folderPath);
  const manifestKey = path.join(folderPath, baseName).replaceAll('\\', '/');

  const image = sharp(filePath);
  await fs.mkdir(outputFolder, { recursive: true });

  const originalOutputPath = path.join(outputFolder, fileName);
  const originalManifestPath = path.join(folderPath, fileName).replaceAll('\\', '/');

  if (!fssync.existsSync(originalOutputPath)) {
    await fs.copyFile(filePath, originalOutputPath);
    console.log(`📄 Copiado original: ${originalManifestPath}`);
  }

  if (manifest[manifestKey] && await generatedFilesExist(manifest[manifestKey])) {
    console.log(`⚠️  Saltado (ya existe): ${manifestKey}`);
    return;
  }

  console.log(`ℹ️ Generando tamaños: ${sizes.join(', ')}`);

  const avifPaths = {};
  for (const size of sizes) {
    const outputFileName = `${baseName}-${size}.avif`;
    const outputPath = path.join(outputFolder, outputFileName);
    const relPath = path.join(folderPath, outputFileName).replaceAll('\\', '/');

    if (!fssync.existsSync(outputPath)) {
      await image
        .resize({ width: size })        
        .toFormat(format, avifOptions)
        .toFile(outputPath);
      console.log(`✅ Generado (resize): ${relPath}`);
    }

    avifPaths[size] = { [format]: relPath };
  }

  const normalizedFolderPath = (folderPath === '.' || folderPath === '') ? '' : folderPath.replaceAll('\\', '/');
  const manifestPathValue = normalizedFolderPath === '' ? '/' : '/' + normalizedFolderPath;

  manifest[manifestKey] = {
    path: manifestPathValue,
    original: originalManifestPath,
    ...avifPaths,
  };

  await saveManifest();
}

async function cleanupDeletedInputs() {
  const keys = Object.keys(manifest);
  for (const key of keys) {
    const relativePath = path.join(manifest[key].path, path.basename(manifest[key].original));
    const fullInputPath = path.join(inputDir, relativePath);
    if (!fssync.existsSync(fullInputPath)) {
      console.log(`🗑️  Eliminado: ${relativePath}`);

      for (const size of sizes) {
        const avifPath = manifest[key]?.[size]?.[format];
        if (avifPath) {
          const fullOutputPath = path.join(outputDir, avifPath);
          if (fssync.existsSync(fullOutputPath)) {
            await fs.unlink(fullOutputPath);
          }
        }
      }

      const originalOutput = path.join(outputDir, manifest[key].original);
      if (fssync.existsSync(originalOutput)) {
        await fs.unlink(originalOutput);
      }

      delete manifest[key];
      await saveManifest();
    }
  }
}

console.log(`👀 Observando: ${inputDir}`);

chokidar
  .watch(inputDir, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
  })
  .on('add', async (filePath) => {
    if (/\.(jpe?g|png|webp|avif)$/i.test(filePath)) {
      await cleanupDeletedInputs();
      await processImage(filePath);
    }
  })
  .on('change', async (filePath) => {
    if (/\.(jpe?g|png|webp|avif)$/i.test(filePath)) {
      await cleanupDeletedInputs();
      await processImage(filePath);
    }
  })
  .on('unlink', async () => {
    await cleanupDeletedInputs();
  });
