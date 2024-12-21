import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import {FunctionComponent} from 'react';
import Image from 'next/image';
import type {MarkerData} from '@/types/location-types';
import {useHover} from '@uidotdev/usehooks';

interface MarkersProps {
    markers: MarkerData[];
}

export const Markers: FunctionComponent<MarkersProps> = ({markers}) => {
    return (
        <>
            {markers.map((marker) => (
                <MarkerWithInfoWindow key={`${marker.park.fullName}${marker.park.id}`} markerData={marker} />
            ))}
        </>
    );
};

interface MarkerWithInfoWindowProps {
    markerData: MarkerData;
}

// TODO: Render more info about marker in <InfoWindow/>
const MarkerWithInfoWindow: FunctionComponent<MarkerWithInfoWindowProps> = ({markerData}) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [hoverRef, hovering] = useHover();

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                key={`${markerData.park.latitude}${markerData.park.longitude}`}
                position={markerData.location}
            >
                <Image
                    ref={hoverRef}
                    src={'https://utfs.io/f/vWKtdZl81f5UMw786LSheYiJSk1D7b5FHUv9Oo62BQNZLAIs'}
                    alt={'Cat'}
                    width={30}
                    height={30}
                />
            </AdvancedMarker>

            {hovering && (
                <div className='bg-slate-900'>
                    <InfoWindow anchor={marker} headerDisabled={true}>
                        <div className='flex flex-col justify-center items-center text-black font-bold'>
                            <h2>{markerData.park.fullName}</h2>
                        </div>
                    </InfoWindow>
                </div>
            )}
        </>
    );
};
