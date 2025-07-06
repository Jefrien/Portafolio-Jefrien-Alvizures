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
const sizes = [320, 768];
const format = 'avif';

const avifOptions = {
  quality: 80,
  effort: 5,
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
  const originalPath = generatedPaths?.original;
  if (!originalPath || !fssync.existsSync(path.join(outputDir, originalPath))) {
    return false;
  }

  for (const size of sizes) {
    const filepath = generatedPaths?.[size]?.[format];
    if (!filepath || !fssync.existsSync(path.join(outputDir, filepath))) {
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
  const outputFolder = path.join(outputDir, folderPath);
  const manifestKey = path.join(folderPath, baseName).replaceAll('\\', '/');

  const normalizedFolderPath = (folderPath === '.' || folderPath === '') ? '' : folderPath.replaceAll('\\', '/');
  const manifestPathValue = normalizedFolderPath === '' ? '/' : '/' + normalizedFolderPath;

  const image = sharp(filePath);
  await fs.mkdir(outputFolder, { recursive: true });

  if (manifest[manifestKey] && await generatedFilesExist(manifest[manifestKey])) {
    console.log(`⚠️  Saltado (ya existe): ${manifestKey}`);
    return;
  }

  // ✅ Generar versión original AVIF (sin resize)
  const fullOutputFileName = `${baseName}-original.avif`;
  const fullOutputPath = path.join(outputFolder, fullOutputFileName);
  const fullRelPath = path.join(folderPath, fullOutputFileName).replaceAll('\\', '/');

  if (!fssync.existsSync(fullOutputPath)) {
    await image
      .withMetadata(false)
      .toFormat(format, avifOptions)
      .toFile(fullOutputPath);
    console.log(`✅ Generado original AVIF: ${fullRelPath}`);
  }

  // ✅ Generar versiones redimensionadas
  const avifPaths = {};
  for (const size of sizes) {
    const outputFileName = `${baseName}-${size}.avif`;
    const outputPath = path.join(outputFolder, outputFileName);
    const relPath = path.join(folderPath, outputFileName).replaceAll('\\', '/');

    if (!fssync.existsSync(outputPath)) {
      await image
        .resize({ width: size })
        .withMetadata(false)
        .toFormat(format, avifOptions)
        .toFile(outputPath);
      console.log(`✅ Generado ${size}px: ${relPath}`);
    }

    avifPaths[size] = { [format]: relPath };
  }

  // ✅ Guardar en manifest
  manifest[manifestKey] = {
    path: manifestPathValue,
    original: fullRelPath,
    ...avifPaths,
  };

  await saveManifest();
}

async function cleanupDeletedInputs() {
  const keys = Object.keys(manifest);
  for (const key of keys) {
    const inputRelative = path.join(manifest[key].path === '/' ? '' : manifest[key].path.slice(1), `${path.basename(key)}.*`);
    const inputGlob = path.join(inputDir, inputRelative);
    const found = fssync.readdirSync(path.dirname(inputGlob))
      .some(name => name.startsWith(path.basename(key)));

    if (!found) {
      console.log(`🗑️  Eliminado: ${key}`);

      // Borrar AVIFs generados
      for (const size of sizes) {
        const avifPath = manifest[key]?.[size]?.[format];
        if (avifPath) {
          const fullOutputPath = path.join(outputDir, avifPath);
          if (fssync.existsSync(fullOutputPath)) {
            await fs.unlink(fullOutputPath);
          }
        }
      }

      // Borrar original AVIF
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
