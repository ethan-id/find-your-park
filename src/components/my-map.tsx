'use client';

import {useState, type FC} from 'react';
import {useRouter} from 'next/navigation';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';
import {Button} from '@heroui/react';
import {Markers} from './markers';
import {Legend} from './legend';
import type {Park} from '@/types/park-types';
import type {Campground} from '@/types/campgrounds-types';
import {convertSitesToMarkers} from '@/utils/markers';
import {Dice6} from 'lucide-react';

const pickRandomPark = (max: number) => Math.abs(Math.floor((Math.random() * (0 - max - 1 + 1))));

interface MyMapProps {
    parks: Park[];
    campgrounds: Campground[];
}

export const MyMap: FC<MyMapProps> = ({parks, campgrounds}) => {
    const router = useRouter();

    const [seeParks, setSeeParks] = useState(true);
    const [seeCamps, setSeeCamps] = useState(false);

    const {markers: parkMarkers} = convertSitesToMarkers(parks);
    const {markers: campMarkers} = convertSitesToMarkers(campgrounds);

    return (
        <div className='map-container'>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{lat: 38.68305259919395, lng: -94.8430405088294}}
                defaultTilt={30}
                defaultZoom={5}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '100vw', height: '92vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <MapControl position={ControlPosition.TOP_LEFT}>
                    <Legend
                        setSeeParks={setSeeParks}
                        setSeeCamps={setSeeCamps}
                    />
                </MapControl>
                <MapControl position={ControlPosition.BOTTOM_LEFT}>
                    <Button
                        className='py-6 px-4 m-6'
                        color='primary'
                        onClick={() => router.push(`/parks/${parks[pickRandomPark(parks.length)].parkCode}`)}
                        variant='shadow'
                    >
                        <Dice6 size={32} />
                    </Button>
                </MapControl>
                {seeParks && (
                    <Markers
                        markers={parkMarkers}
                        type={'PARK'}
                    />
                )}
                {seeCamps && (
                    <Markers
                        markers={campMarkers}
                        type={'CAMPGROUND'}
                    />
                )}
            </Map>
        </div>
    );
};
