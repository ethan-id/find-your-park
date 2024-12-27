'use client';

import {FunctionComponent} from 'react';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import Image from 'next/image';
import {useParks} from '@/hooks/use-parks';
import {useParkMarkers} from '@/hooks/use-park-markers';
import {useCampgrounds} from '@/hooks/use-campgrounds';
import {Button} from '@nextui-org/react';

export const MyMap: FunctionComponent = () => {
    const {parks, loading: parksLoading} = useParks();

    // TODO: Add markers for campgrounds ?
    const {campgrounds, loading: campsLoading, error: campsError} = useCampgrounds();

    const {parkMarkers} = useParkMarkers(parks, parksLoading);

    // TODO: Implement <MapControl/> to refine visible markers
    //<MapControl position={ControlPosition.TOP_LEFT}></MapControl>
    // TODO: Add <Switch/> map controls that toggle <Markers/> with other data from API
    return (
        <div className='map-container h-[100vh] w-[65vw]'>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: 38.68305259919395,
                    lng: -94.8430405088294
                }}
                defaultTilt={30}
                defaultZoom={5}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '100vw', height: '100vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <MapControl position={ControlPosition.TOP_LEFT}>
                    <div className='flex flex-col bg-[#8fffe2] gap-2 text-black max-w-fit p-6 m-6 rounded-lg'>
                        <p className='text-3xl font-semibold pb-2'>Legend</p>
                        <div className='flex flex-row items-center text-lg gap-4'>
                            <Image
                                src={'https://utfs.io/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                                alt={'Cat'}
                                width={30}
                                height={30}
                            />
                            {'National Park'}
                        </div>
                        <div className='flex flex-row items-center text-lg gap-4'>
                            <Image
                                src={'https://utfs.io/f/vWKtdZl81f5UvjbDkE81f5URCm8dB0Y6kWywlsLzbPcIXEqZ'}
                                alt={'Cat'}
                                width={30}
                                height={30}
                            />
                            {'Campgrounds (To Be Added)'}
                        </div>
                    </div>
                </MapControl>
                <Markers markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers] : []} />
            </Map>
        </div>
    );
};
