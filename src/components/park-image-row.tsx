import {FunctionComponent, Suspense} from 'react';
import SuspenseImage from '@/components/suspense-image';
import {Skeleton} from '@nextui-org/react';
import {Park} from '@/types/park-types';

interface ParkImageRow {
    images: Park['images'];
}

export const ParkImageRow: FunctionComponent<ParkImageRow> = ({images}) => {
    return (
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
