'use client';

import {useParksContext} from '@/contexts/parks-context';
import {FunctionComponent} from 'react';
import {Skeleton, Spinner} from '@nextui-org/react';
import {Suspense} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SuspenseImage from '@/components/suspense-image';

interface ParkInfoProps {
    parkID: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkID}) => {
    const {parks} = useParksContext();

    // TODO: Replace with fetch to `/parks?parkCode=${parkID}`???
    const park = parks?.find((park) => park.id === parkID);

    // TODO: Add useAlerts() hook that hits `/alerts?parkCode=${park}`
    // const {alerts} = useAlerts(park);

    if (!park) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    // TODO: Add zoomed in map on park location
    return (
        <div className='flex flex-col items-center min-h-screen py-24 gap-32'>
            <div className='flex flex-col items-center justify-center px-4'>
                <a
                    className='text-3xl font-semibold text-blue-600 hover:underline flex items-center gap-2 mb-6'
                    target='_blank'
                    href={park.url}
                >
                    {park.name}
                    <OpenInNewIcon />
                </a>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                    <div className='flex-shrink-0 w-full md:w-1/3'>
                        {park.images && park.images.length > 0 ? (
                            <Suspense fallback={<ImgFallback />}>
                                <SuspenseImage
                                    src={park.images[0].url}
                                    alt={park.images[0].altText ?? 'Park Image'}
                                    className='w-full aspect-square rounded-lg object-cover'
                                    key={park.images[0].url}
                                />
                            </Suspense>
                        ) : null}
                    </div>

                    <div className='flex flex-col w-full md:w-2/3 text-left'>
                        <h2 className='text-xl font-semibold mb-4'>{park.fullName}</h2>
                        <p className='text-base leading-relaxed'>{park.description}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-4 max-w-[50vw] max-h-[70vh] snap-x snap-mandatory overflow-x-scroll'>
                {park.images && park.images.length > 0
                    ? park.images.slice(1).map((image) => (
                          <Suspense fallback={<ImgFallback className='min-w-[50vw] min-h-[50vh]' />}>
                              <SuspenseImage
                                  src={image.url}
                                  alt={image.altText ?? 'Park Image'}
                                  className='rounded-xl object-cover snap-always snap-center w-full aspect-square'
                                  key={`${image.url}${image.title}`}
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
