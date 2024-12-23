'use client';

import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps';
import {Markers} from '@/components/markers';
import {useParks} from '@/hooks/use-parks';
import {useMarkers} from '@/hooks/use-markers';
import {useCampgrounds} from '@/hooks/use-campgrounds';

export const MyMap: FunctionComponent = () => {
    const {parks, loading: parksLoading} = useParks();

    // TODO: Add markers for campgrounds ??
    const {campgrounds, loading: campsLoading, error: campsError} = useCampgrounds();

    const {parkMarkers} = useMarkers(parks, parksLoading);

    // TODO: Implement <MapControl/> to refine visible markers
    //<MapControl position={ControlPosition.TOP_LEFT}></MapControl>
    // TODO: Add <Switch/> map controls that toggle <Markers/> with other data from API
    return (
        <div className='map-container h-[100vh] w-[70vw]'>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: 38.68305259919395,
                    lng: -94.8430405088294
                }}
                defaultTilt={30}
                defaultZoom={4.35}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '70vw', height: '100vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <Markers markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers] : []} />
            </Map>
        </div>
    );
};
