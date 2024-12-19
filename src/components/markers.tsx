import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import {FunctionComponent, useState, useCallback} from 'react';
import Image from 'next/image';
import type {MarkerData} from '@/types/location-types';

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
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(() => setInfoWindowShown((isShown) => !isShown), []);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                key={`${markerData.park.latitude}${markerData.park.longitude}`}
                position={markerData.location}
                onClick={handleMarkerClick}
            >
                <Image
                    src={'https://utfs.io/f/vWKtdZl81f5UMw786LSheYiJSk1D7b5FHUv9Oo62BQNZLAIs'}
                    alt={'Cat'}
                    width={30}
                    height={30}
                />
            </AdvancedMarker>

            {infoWindowShown && (
                <div className='bg-slate-900'>
                    <InfoWindow anchor={marker} onClose={handleClose} headerDisabled={true}>
                        <div className='flex flex-col justify-center items-center text-black font-bold'>
                            <h2>{markerData.park.fullName}</h2>
                        </div>
                    </InfoWindow>
                </div>
            )}
        </>
    );
};
