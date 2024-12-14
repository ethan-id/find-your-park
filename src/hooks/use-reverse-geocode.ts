'use client';

import {useEffect, useMemo, useState} from 'react';

interface ReverseGeocodeResult {
    stateCode?: string;
}

interface UseReverseGeocodeOptions {
    latitude?: number;
    longitude?: number;
    mapsLoaded: boolean;
}

export function useReverseGeocode({latitude, longitude, mapsLoaded}: UseReverseGeocodeOptions) {
    const [result, setResult] = useState<ReverseGeocodeResult | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const geocoder = useMemo(() => {
        if (mapsLoaded && typeof window !== 'undefined' && window.google && window.google.maps) {
            return new google.maps.Geocoder();
        }
        return null;
    }, [mapsLoaded]);

    useEffect(() => {
        // If maps aren't loaded or geocoder isn't ready, or we have no coords, just return early.
        if (!mapsLoaded || !geocoder || latitude == null || longitude == null) {
            setLoading(true);
            return;
        }

        // We have maps, geocoder, and coordinates
        setLoading(true);
        geocoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
                const addrComponents = results[0].address_components;
                const state = addrComponents.find((comp) => comp.types.includes('administrative_area_level_1'));

                setResult({stateCode: state?.short_name});
                setError(null);
            } else {
                setError(new Error(`Geocoding failed: ${status}`));
                setResult(null);
            }
            setLoading(false);
        });
    }, [geocoder, mapsLoaded, latitude, longitude]);

    return {result, error, loading};
}
