import images from '@/images.json';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Loader2 } from 'lucide-react';
import { useState } from 'preact/hooks';
import clsx from 'clsx';

export default function Image({ src, alt, width, height, className, forceSize = null }) {
    const [isLoading, setIsLoading] = useState(true);
    const image = images[src];

    if (!image) {
        return null;
    }

    const { path, original } = image;
    const srcSet = Object.entries(image)
        .filter(([key]) => !isNaN(parseInt(key)))
        .map(([size, data]) => `images/${data.avif} ${parseInt(size)}w`)
        .join(', ');

    console.log('forced', image[forceSize])
    const sizeForceSrc = forceSize ? 'images/' + image[forceSize].avif : 'images/' + original;

    return (
        <div className="relative inline-block size-full">
            <LazyLoadImage
                src={sizeForceSrc}
                srcSet={!forceSize ? srcSet : undefined}
                alt={alt}
                width={width}
                height={height}
                className={clsx(
                    className,
                    'transition-opacity duration-300',
                    isLoading ? 'opacity-0' : 'opacity-100'
                )}
                onLoad={() => setIsLoading(false)}
                sizes="(max-width: 320px) 320px, (max-width: 768px) 768px, 100vw"
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/10 size-full">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}
        </div>
    );
}