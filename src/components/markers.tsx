import {AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import {FunctionComponent} from 'react';
import Image from 'next/image';
import type {Poi} from '@/types/location-types';

interface MarkersProps {
    markers: Poi[];
}

export const Markers: FunctionComponent<MarkersProps> = ({markers}) => {
    return (
        <>
            {markers.map((poi: Poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                    <Image
                        src={'https://utfs.io/f/vWKtdZl81f5UMw786LSheYiJSk1D7b5FHUv9Oo62BQNZLAIs'}
                        alt={'Cat'}
                        width={30}
                        height={30}
                    />
                </AdvancedMarker>
            ))}
        </>
    );
};
