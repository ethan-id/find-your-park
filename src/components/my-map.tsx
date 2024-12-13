import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {Poi} from '@/types/location-types';

interface MyMapProps {
    longitude: number;
    latitude: number;
}

export const MyMap: FunctionComponent<MyMapProps> = ({longitude, latitude}) => {
    const userLocation: Poi = {
        key: 'Your Position',
        location: {
            lat: latitude,
            lng: longitude
        }
    };

    return (
        <div className=''>
            <div>
                Latitude: {latitude}, Longitude: {longitude}
            </div>

            <Map
                mapId={'testing-id'}
                style={{width: '80vw', height: '80vh'}}
                colorScheme={'DARK'}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                reuseMaps
            >
                <Markers markers={[userLocation]} />
            </Map>
        </div>
    );
};
