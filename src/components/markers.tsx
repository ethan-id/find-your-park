import {AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import {FunctionComponent} from 'react';
import type {Poi} from '@/types/location-types';

interface MarkersProps {
    markers: Poi[];
}

export const Markers: FunctionComponent<MarkersProps> = ({markers}) => {
    return (
        <>
            {markers.map((poi: Poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                    <Pin
                        background={'#FBBC04'}
                        glyphColor={'#000'}
                        borderColor={'#000'}
                    />
                </AdvancedMarker>
            ))}
        </>
    );
};
