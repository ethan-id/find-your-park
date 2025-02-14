'use client';

import {useState, type FC} from 'react';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';
import {Markers} from './markers';
import {Legend} from './legend';
import type {Park} from '@/types/park-types';
import type {Campground} from '@/types/campgrounds-types';
import {convertSitesToMarkers} from '@/utils/markers';

interface MyMapProps {
    parks: Park[];
    campgrounds: Campground[];
}

export const MyMap: FC<MyMapProps> = ({parks, campgrounds}) => {
    const [seeParks, setSeeParks] = useState(true);
    const [seeCamps, setSeeCamps] = useState(false);

    console.log(seeParks, seeCamps);

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
