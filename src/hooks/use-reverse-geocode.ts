'use client';

import {useEffect, useMemo, useState} from 'react';

interface ReverseGeocodeResult {
    stateCode?: string;
    // You could add more properties as needed (city, country, etc.)
}

interface UseReverseGeocodeOptions {
    latitude?: number;
    longitude?: number;
}

export function useReverseGeocode({latitude, longitude}: UseReverseGeocodeOptions) {
    const [result, setResult] = useState<ReverseGeocodeResult | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Create geocoder instance once Google Maps is loaded
    const geocoder = useMemo(() => {
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
            return new google.maps.Geocoder();
        }
        return null;
    }, []);

    useEffect(() => {
        // Only run if we have coordinates and geocoder is ready
        if (!geocoder || latitude === undefined || longitude === undefined) {
            // If we have no geocoder but have coordinates, we might still be loading
            // If we have no coords, we might be waiting on geolocation
            // Handle these states as you wish
            if (latitude === undefined || longitude === undefined) {
                setLoading(true);
            } else {
                setLoading(false);
            }
            return;
        }

        // We have geocoder and coordinates now, fetch data
        setLoading(true);
        geocoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
                const addrComponents = results[0].address_components;
                const state = addrComponents.find((comp) => comp.types.includes('administrative_area_level_1'));

                setResult({
                    stateCode: state?.short_name
                });
                console.log(state?.short_name);
                setLoading(false);
            } else {
                setError(new Error(`Geocoding failed: ${status}`));
                setLoading(false);
            }
        });
    }, [geocoder, latitude, longitude]);

    return {result, error, loading};
}
