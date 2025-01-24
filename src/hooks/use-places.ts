import {useState, useEffect} from 'react';
import {placesResponseSchema, PlacesResponse, PlaceItem} from '@/types/places-types';

async function fetchPlaces(parkCode?: string): Promise<PlacesResponse> {
    const url = `https://developer.nps.gov/api/v1/places?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode ?? ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = placesResponseSchema.parse(json);
    return parsedData;
}

export function usePlaces(parkCode?: string) {
    const [places, setPlaces] = useState<PlaceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchPlaces(parkCode)
            .then((response) => {
                setPlaces(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return {places, loading, error};
}
