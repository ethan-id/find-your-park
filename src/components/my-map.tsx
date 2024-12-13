import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';

interface MyMapProps {
    longitude: number;
    latitude: number;
}

export const MyMap: FunctionComponent<MyMapProps> = ({longitude, latitude}) => {
    return (
        <div className=''>
            <div>
                Latitude: {latitude}, Longitude: {longitude}
            </div>
            <Map
                style={{width: '80vw', height: '80vh'}}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultZoom={6}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </div>
    );
};
