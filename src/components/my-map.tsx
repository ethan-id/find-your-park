import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {Poi} from '@/types/location-types';

interface MyMapProps {
    longitude: number;
    latitude: number;
    parkMarkers?: Poi[];
}

export const MyMap: FunctionComponent<MyMapProps> = ({longitude, latitude, parkMarkers}) => {
    const userLocation: Poi = {
        key: 'Your Position',
        location: {
            lat: latitude,
            lng: longitude
        }
    };

    return (
        <div className=''>
            <Map
                mapId={'testing-id'}
                style={{width: '80vw', height: '100vh'}}
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultZoom={5}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                reuseMaps
            >
                <Markers
                    markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers, userLocation] : [userLocation]}
                />
            </Map>
        </div>
    );
};
