'use client';

import {type FC} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {Park} from '@/types/park-types';
import {convertSitesToMarkers} from '@/utils/markers';
import {MarkerData} from '@/types/location-types';

const getUserBounds = (markers: MarkerData[]) => {
    const boundsBuilder = new google.maps.LatLngBounds();

    markers.map((marker) => {
        boundsBuilder.extend(marker.location);
    });

    return boundsBuilder;
};

interface ParkMapProps {
    parks: Park[];
}

export const UserMap: FC<ParkMapProps> = ({parks}) => {
    const {markers} = convertSitesToMarkers(parks);
    const bounds = getUserBounds(markers);

    return (
        <div className='w-full dark:bg-gray-800 rounded-xl overflow-hidden'>
            <Map
                colorScheme='FOLLOW_SYSTEM'
                defaultCenter={{
                    lat: Number(parks[0].latitude),
                    lng: Number(parks[0].longitude)
                }}
                defaultTilt={60}
                defaultZoom={10}
                mapId='PARK_MAP'
                disableDefaultUI={true}
                gestureHandling='greedy'
                style={{width: '100%', height: '50vh'}}
                reuseMaps={true}
                renderingType='VECTOR'
            >
                <Markers
                    bounds={bounds}
                    markers={[...markers]}
                    type='PARK'
                />
            </Map>
        </div>
    );
};
