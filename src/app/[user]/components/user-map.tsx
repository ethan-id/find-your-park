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
        <div className='md:col-span-2 row-span-2 w-full md:aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 sm:h-auto'>
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
                style={{width: '100%', height: '100%'}}
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
