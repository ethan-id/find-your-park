'use client';

import {FunctionComponent} from 'react';
import {Alert, Chip, cn, Spinner} from '@nextui-org/react';
import {Map} from '@vis.gl/react-google-maps';
import Link from 'next/link';
import {Markers} from '@/components/markers';
import {ParkImageRow} from './park-image-row';
import {AlertList} from '@/components/alert-list';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import {useEvents} from '@/hooks/use-events';
import {useParks} from '@/hooks/use-parks';
import type {MarkerData} from '@/types/location-types';

interface ParkInfoProps {
    parkCode: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkCode}) => {
    const {parks, loading, error} = useParks(parkCode);
    // const {events} = useEvents(parkCode);

    const park = parks?.[0];

    if (loading) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    if (!park || error) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <Alert
                        color={'danger'}
                        classNames={{base: cn(['text-3xl'])}}
                        title={"Couldn't load park information, sorry 😕"}
                        variant={'solid'}
                    />
                    <Link href={'/'}>Head back home</Link>
                </div>
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
                        className='text-3xl font-semibold text-blue-600 hover:underline flex items-center gap-2'
                        target='_blank'
                        href={park.url}
                    >
                        {park.fullName}
                        <OpenInNewIcon />
                    </a>
                    <ul className='flex flex-row gap-4 py-4 w-full overflow-x-auto snap-x snap-mandatory'>
                        {park.activities.map((activity) => (
                            <li className=''>
                                <Chip key={`${park.name}-${activity.name}`} size={'sm'}>
                                    {activity.name}
                                </Chip>
                            </li>
                        ))}
                    </ul>

                    <p className='text-base leading-relaxed'>{park.description}</p>
                </div>
            </div>

            <ParkImageRow images={park.images} />
        </div>
    );
};
