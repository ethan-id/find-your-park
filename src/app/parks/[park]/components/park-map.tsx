'use client';

import {FC} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {Park} from '@/types/park-types';
import {usePlaces} from '@/hooks/use-places';
import {useBounds} from '@/hooks/use-bounds';
import {MarkerData} from '@/types/location-types';

interface ParkMapProps {
    park: Park;
}

export const ParkMap: FC<ParkMapProps> = ({park}) => {
    const {bounds} = useBounds(park.parkCode);
    const {places} = usePlaces(park.parkCode);

    let markers: MarkerData[] = [];
    if (places) {
        markers = places.map((place) => ({
            label: place.title,
            location: {
                lat: Number(place.latitude),
                lng: Number(place.longitude)
            }
        }));
    }

    const parkMarker: MarkerData = {
        label: park.fullName,
        location: {
            lat: Number(park.latitude),
            lng: Number(park.longitude)
        }
    };

    return (
        <div className='w-full sm:w-[90vw] md:w-1/3 md:aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 sm:h-auto'>
            <Map
                colorScheme='FOLLOW_SYSTEM'
                defaultCenter={{
                    lat: Number(park.latitude),
                    lng: Number(park.longitude)
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
                    markers={[parkMarker, ...markers]}
                    bounds={bounds}
                />
            </Map>
        </div>
    );
};
