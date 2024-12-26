'use client';

import {FunctionComponent, useEffect} from 'react';
import {ControlPosition, Map, MapControl, useMap} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {useParks} from '@/hooks/use-parks';
import {useMarkers} from '@/hooks/use-markers';
// import {useCampgrounds} from '@/hooks/use-campgrounds';

export const MyMap: FunctionComponent = () => {
    const {parks, loading: parksLoading} = useParks();
    const map = useMap();

    // TODO: Add markers for campgrounds ??
    // const {campgrounds, loading: campsLoading, error: campsError} = useCampgrounds();

    const {parkMarkers} = useMarkers(parks, parksLoading);

    useEffect(() => {
        if (!map) return;

        // TODO: Render shapes/polygons on the map here https://developers.google.com/maps/documentation/javascript/shapes
        const flightPlanCoordinates = [
            {lat: 37.772, lng: -122.214},
            {lat: 21.291, lng: -157.821},
            {lat: -18.142, lng: 178.431},
            {lat: -27.467, lng: 153.027}
        ];

        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FFF',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
    }, [map]);

    // TODO: Implement <MapControl/> to refine visible markers
    //<MapControl position={ControlPosition.TOP_LEFT}></MapControl>
    // TODO: Add <Switch/> map controls that toggle <Markers/> with other data from API
    return (
        <div className='map-container h-[100vh] w-[65vw]'>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: 38.68305259919395,
                    lng: -94.8430405088294
                }}
                defaultTilt={30}
                defaultZoom={5}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '100vw', height: '100vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <MapControl position={ControlPosition.TOP_LEFT}>
                    <p className='m-6 p-12 text-6xl font-bold rounded-lg bg-[#05080b]'>Looking for a National Park?</p>
                </MapControl>
                <Markers markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers] : []} />
            </Map>
        </div>
    );
};
