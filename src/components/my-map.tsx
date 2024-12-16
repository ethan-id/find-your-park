import {FunctionComponent} from 'react';
import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {MarkerData} from '@/types/location-types';
import {Park} from '@/types/park-types';

interface MyMapProps {
    longitude: number;
    latitude: number;
    parkMarkers?: MarkerData[];
}

export const MyMap: FunctionComponent<MyMapProps> = ({longitude, latitude, parkMarkers}) => {
    const userLocation: MarkerData = {
        park: {
            id: 'your-location-id',
            fullName: 'Your Position'
        } as Park,
        location: {
            lat: latitude,
            lng: longitude
        }
    };

    return (
        <div className=''>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultTilt={30}
                defaultZoom={7}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '70vw', height: '100vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <Markers
                    markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers, userLocation] : [userLocation]}
                />
                <MapControl position={ControlPosition.TOP_LEFT}>Hello, map control!</MapControl>
            </Map>
        </div>
    );
};
