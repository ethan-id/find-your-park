import {FunctionComponent, Suspense} from 'react';
import SuspenseImage from '@/components/suspense-image';
import {Skeleton} from '@nextui-org/react';
import {ParkImage} from '@/types/park-types';
import {PersonImage} from '@/types/people-types';

interface ImageRow {
    images: (ParkImage | PersonImage)[];
    title: string;
}

// TODO: Make Image clickable for <Link href={`/people/person-name`}/>
export const ImageRow: FunctionComponent<ImageRow> = ({images, title}) => {
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
                              <SuspenseImage
                                  src={image.url}
                                  alt={image.altText ?? 'Park Image'}
                                  className='rounded-xl object-cover snap-always snap-center w-[300px] aspect-square'
                                  key={`${image.title}-${i}`}
                              />
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
