import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef, useMap} from '@vis.gl/react-google-maps';
import {useState, useCallback, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useHover} from '@uidotdev/usehooks';
import type {MarkerData} from '@/types/location-types';
import type {FunctionComponent} from 'react';

interface MarkersProps {
    markers: MarkerData[];
    bounds?: google.maps.LatLngBounds | null;
}

export const Markers: FunctionComponent<MarkersProps> = ({markers, bounds}) => {
    const map = useMap();

    useEffect(() => {
        if (bounds && map) map.fitBounds(bounds);
    }, [map, bounds])

    return (
        <>
            {markers.map((marker, i) => (
                <MarkerWithInfoWindow
                    key={`${marker.label}-${i}`}
                    markerData={marker}
                />
            ))}
        </>
    );
};

interface MarkerWithInfoWindowProps {
    markerData: MarkerData;
}

const MarkerWithInfoWindow: FunctionComponent<MarkerWithInfoWindowProps> = ({markerData}) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [hoverRef, hovering] = useHover();
    const [_, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(() => setInfoWindowShown((isShown) => !isShown), []);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                key={`${markerData.location.lat}${markerData.location.lng}`}
                position={markerData.location}
                onClick={handleMarkerClick}
            >
                {markerData.linkHref ? (
                    <Link href={markerData.linkHref}>
                        <Image
                            ref={hoverRef}
                            src={'https://utfs.io/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                            alt={'Tree Emoji'}
                            width={25}
                            height={25}
                        />
                    </Link>
                ) : (
                    <Image
                        ref={hoverRef}
                        src={'https://utfs.io/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                        alt={'Tree Emoji'}
                        width={25}
                        height={25}
                    />
                )}
            </AdvancedMarker>

            {hovering && (
                <div className='bg-slate-900'>
                    <InfoWindow
                        anchor={marker}
                        onClose={handleClose}
                        headerDisabled={true}
                    >
                        <div className='flex flex-col justify-center items-center text-black font-bold'>
                            <h2>{markerData.label}</h2>
                        </div>
                    </InfoWindow>
                </div>
            )}
        </>
    );
};
