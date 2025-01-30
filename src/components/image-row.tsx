'use client';

import {Suspense} from 'react';
import {usePathname} from 'next/navigation';
import {Skeleton} from "@heroui/react";
import {SuspenseImage} from '@/components/suspense-image';
import {toKebabCase} from '@/utils/string-utils';
import type {FunctionComponent} from 'react';
import type {ParkImage} from '@/types/park-types';
import type {PersonImage} from '@/types/people-types';
import Link from 'next/link';

interface ImageRow {
    images: (ParkImage | PersonImage)[];
    isPeople: boolean;
    title: string;
}

// TODO: Make Image clickable for <Link href={`/people/person-name`}/>
export const ImageRow: FunctionComponent<ImageRow> = ({images, title, isPeople}) => {
    const path = usePathname();

    const parkCode = path.slice(-4);

    return (
        <div className='flex flex-col justify-center text-xl gap-3'>
            {title}
            <div className='flex flex-row gap-4 w-full max-w-6xl overflow-x-auto snap-x snap-mandatory'>
                {images && images.length > 0
                    ? images.map((image, i) => (
                          <Suspense
                              key={`${image.title}-suspense-${i}`}
                              fallback={
                                  <ImgFallback
                                      key={`${image.title}-fallback-${i}`}
                                      className='min-w-[300px] min-h-[300px]'
                                  />
                              }
                          >
                              {isPeople && image.title ? (
                                  <Link href={`/people/${parkCode}/${toKebabCase(image.title ?? '')}`}>
                                      <SuspenseImage
                                          src={image.url}
                                          alt={image.altText ?? 'Park Image'}
                                          className='rounded-xl object-cover snap-always snap-center w-[300px] aspect-square hover:opacity-75'
                                          key={`${image.title}-${i}`}
                                      />
                                  </Link>
                              ) : (
                                  <SuspenseImage
                                      src={image.url}
                                      alt={image.altText ?? 'Park Image'}
                                      className='rounded-xl object-cover snap-always snap-center w-[300px] aspect-square'
                                      key={`${image.title}-${i}`}
                                  />
                              )}
                          </Suspense>
                      ))
                    : null}
            </div>
        </div>
    );
};

interface ImgFallbackProps {
    className?: string;
}

const ImgFallback: FunctionComponent<ImgFallbackProps> = ({className}) => {
    return (
        <Skeleton className={`w-full aspect-square rounded-lg ${className}`}>
            <div className='h-full' />
        </Skeleton>
    );
};
