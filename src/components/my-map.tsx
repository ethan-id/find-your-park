import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';
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
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '70vw', height: '100vh'}}
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: latitude as number,
                    lng: longitude as number
                }}
                defaultZoom={7}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <Markers
                    markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers, userLocation] : [userLocation]}
                />
            </Map>
        </div>
    );
};
