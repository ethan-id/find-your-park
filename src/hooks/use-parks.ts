'use client';

import {useState, useEffect} from 'react';
import {ParksAPIResponse, npsResponseSchema, Park} from '@/types/park-types';

// TODO: Add ability to fetch more data, current fetch gets max of 50 items, but has "total" property in json you can use.
async function fetchParks(parkCode?: string): Promise<ParksAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&limit=100&parkCode=${parkCode ?? ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export function useParks(parkCode?: string) {
    const [parks, setParks] = useState<Park[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchParks(parkCode)
            .then((response) => {
                if (isMounted) {
                    setParks(response.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {parks, loading, error};
}
