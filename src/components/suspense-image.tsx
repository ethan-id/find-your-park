'use client';

import type {FunctionComponent} from 'react';

interface ImageState {
    success: boolean;
    error?: Error;
}

const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${src}, Erorr: ${err}`));
    });
};

let imageCache = new Map<string, ImageState>();

interface SuspenseImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const SuspenseImage: FunctionComponent<SuspenseImageProps> = ({src, alt, className}) => {
    const cached = imageCache.get(src);

    // If we have cached success, just render the image
    if (cached?.success) {
        return <img src={src} alt={alt} className={className} />;
    }

    // If we have cached failure, return a fallback without retrying
    if (cached && !cached.success) {
        return;
    }

    // If not cached at all, start loading and throw the promise
    const promise = loadImage(src)
        .then(() => {
            imageCache.set(src, {success: true});
        })
        .catch((err) => {
            imageCache.set(src, {success: false, error: err as Error});
        });

    throw promise;
};
