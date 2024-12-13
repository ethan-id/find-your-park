import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';

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
                colorScheme={'DARK'}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <Markers markers={[]} />
            </Map>
        </div>
    );
};
