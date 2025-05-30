'use client';

import {Suspense} from 'react';
import {usePathname} from 'next/navigation';
import {Skeleton} from '@heroui/react';
import {SuspenseImage} from './suspense-image';
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

export const ImageRow: FunctionComponent<ImageRow> = ({images, title, isPeople}) => {
    const path = usePathname();
    const parkCode = path.slice(-4);

    return (
        <div className='flex flex-col justify-center text-xl gap-3 max-w-[90vw] overflow-x-scroll'>
            {title}
            <div className='flex flex-row gap-4 w-full max-w-6xl overflow-x-auto snap-x snap-mandatory'>
                {images && images.length > 0
                    ? images.map((image, i) => {
                          return (
                              <div
                                  key={`${image.title}-container-${i}`}
                                  className='flex flex-col items-center w-[300px] flex-shrink-0 snap-always snap-center'
                              >
                                  <Suspense
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
                                                  className='rounded-xl object-cover w-[300px] aspect-square hover:opacity-75'
                                                  key={`${image.title}-${i}`}
                                              />
                                          </Link>
                                      ) : (
                                          <SuspenseImage
                                              src={image.url}
                                              alt={image.altText ?? 'Park Image'}
                                              className='rounded-xl object-cover w-[300px] aspect-square'
                                              key={`${image.title}-${i}`}
                                          />
                                      )}
                                  </Suspense>

                                  {image.caption && (
                                      <p className='mt-2 text-sm text-gray-400 text-center'>{image.caption}</p>
                                  )}
                              </div>
                          );
                      })
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
