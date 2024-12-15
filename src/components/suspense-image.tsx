'use client';

import {FunctionComponent} from 'react';

const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = reject;
    });
};

let imageCache = new Map();

interface SuspenseImageProps {
    src: string;
    alt: string;
}

const SuspenseImage: FunctionComponent<SuspenseImageProps> = ({src, alt}) => {
    if (!imageCache.has(src)) {
        let promise = loadImage(src).then(() => {
            imageCache.set(src, true);
        });
        throw promise;
    } else {
        console.log('Found image in cache!');
    }

    return <img src={src} alt={alt} className={'max-h-30 rounded-xl object-cover snap-always snap-center'} />;
};

export default SuspenseImage;
