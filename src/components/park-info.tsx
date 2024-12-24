'use client';

import {useParksContext} from '@/contexts/parks-context';
import {FunctionComponent, useState} from 'react';
import {Skeleton, Spinner, Alert} from '@nextui-org/react';
import {Alert as AlertType} from '@/types/alert-types';
import {Map} from '@vis.gl/react-google-maps';
import {Suspense} from 'react';
import {useAlerts} from '@/hooks/use-alerts';
import {Markers} from '@/components/markers';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SuspenseImage from '@/components/suspense-image';
import {MarkerData} from '@/types/location-types';
import {ParkAlert} from './park-alert';
import {AlertList} from './alert-list';

interface ParkInfoProps {
    parkCode: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkCode}) => {
    // TODO: Replace with fetch to `/parks?parkCode=park.parkCode`??
    const {parks} = useParksContext();
    const park = parks?.find((park) => park.parkCode === parkCode);

    if (!park) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    const parkMarker: MarkerData = {
        park: park,
        location: {
            lat: Number(park.latitude),
            lng: Number(park.longitude)
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen gap-12 py-12 px-4'>
            <AlertList parkCode={park.parkCode} />

            {/* Map, Title, and Description */}
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                {/* Map */}
                <div className='flex-shrink-0 w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden'>
                    <Map
                        colorScheme='FOLLOW_SYSTEM'
                        defaultCenter={{
                            lat: Number(park.latitude),
                            lng: Number(park.longitude)
                        }}
                        defaultTilt={30}
                        defaultZoom={8}
                        mapId='DEMO_MAP_ID'
                        disableDefaultUI={true}
                        gestureHandling='greedy'
                        style={{width: '100%', height: '100%'}}
                        reuseMaps={true}
                        renderingType='VECTOR'
                    >
                        <Markers markers={[parkMarker]} />
                    </Map>
                </div>

                {/* Title and Description */}
                <div className='flex flex-col w-full md:w-2/3 text-left'>
                    <a
                        className='text-3xl font-semibold text-blue-600 hover:underline flex items-center gap-2 mb-4'
                        target='_blank'
                        href={park.url}
                    >
                        {park.fullName}
                        <OpenInNewIcon />
                    </a>
                    <p className='text-base leading-relaxed'>{park.description}</p>
                </div>
            </div>

            {/* Images */}
            <div className='flex flex-row gap-4 w-full max-w-6xl overflow-x-auto snap-x snap-mandatory'>
                {park.images && park.images.length > 0
                    ? park.images.map((image, i) => (
                          <Suspense
                              fallback={
                                  <ImgFallback key={`img-fallback-${i}`} className='min-w-[300px] min-h-[300px]' />
                              }
                          >
                              <SuspenseImage
                                  src={image.url}
                                  alt={image.altText ?? 'Park Image'}
                                  className='rounded-xl object-cover snap-always snap-center w-[300px] aspect-square'
                                  key={`${image.url}${image.title}-${i}`}
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
