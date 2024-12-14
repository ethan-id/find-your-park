'use client';

import {useEffect, useState} from 'react';

interface ReverseGeocodeResult {
    stateCode?: string;
}

interface UseReverseGeocodeProps {
    latitude?: number;
    longitude?: number;
    mapsLoaded: boolean; // We’ll pass this in
}

export function useReverseGeocode({latitude, longitude, mapsLoaded}: UseReverseGeocodeProps) {
    const [result, setResult] = useState<ReverseGeocodeResult | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mapsLoaded || latitude === undefined || longitude === undefined) {
            // If maps not loaded or coords not ready, still "loading"
            if (!mapsLoaded || latitude === undefined || longitude === undefined) {
                setLoading(true);
            }
            return;
        }

        setLoading(true);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
                const addrComponents = results[0].address_components;
                const state = addrComponents.find((comp) => comp.types.includes('administrative_area_level_1'));
                setResult({stateCode: state?.short_name});
                setLoading(false);
            } else {
                setError(new Error(`Geocoding failed: ${status}`));
                setLoading(false);
            }
        });
    }, [mapsLoaded, latitude, longitude]);

    return {result, error, loading};
}
