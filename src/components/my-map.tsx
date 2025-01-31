'use client';

import {ControlPosition, Map, MapControl} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {Legend} from '@/components/legend';
import {useParks} from '@/hooks/use-parks';
import {useParkMarkers} from '@/hooks/use-park-markers';
// import {useCampgrounds} from '@/hooks/use-campgrounds';
import type {FunctionComponent} from 'react';

export const MyMap: FunctionComponent = () => {
    const {parks, loading: parksLoading} = useParks();

    // TODO: Add markers for campgrounds ?
    // const {campgrounds, loading: campsLoading, error: campsError} = useCampgrounds();

    const {parkMarkers} = useParkMarkers(parks, parksLoading);

    // TODO: Implement <MapControl/> to refine visible markers
    // Render list of available activities/things to do for user's to search for parks (should hide/show specific markers)
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
                    <Legend />
                </MapControl>
                <Markers markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers] : []} />
            </Map>
        </div>
    );
};
