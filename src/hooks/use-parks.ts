'use client';

import {useState, useEffect} from 'react';
import {ParksResponse, parksResponseSchema} from '@/types/park-types';

async function fetchParks(stateCode?: string): Promise<ParksResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&stateCode=${stateCode ? '' : ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = parksResponseSchema.parse(json);
    return parsedData;
}

export function useParks(stateCode?: string) {
    const [parks, setParks] = useState<ParksResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!stateCode) {
            setParks(null);
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);

        fetchParks(stateCode)
            .then((data) => {
                if (isMounted) {
                    setParks(data);
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
    }, [stateCode]);

    return {parks, loading, error};
}
