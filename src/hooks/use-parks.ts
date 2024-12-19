'use client';

import {useState, useEffect} from 'react';
import {ParksResponse, parksResponseSchema} from '@/types/park-types';

// TODO: Add ability to fetch more data, current fetch gets max of 50 items, but has "total" property in json you can use.
async function fetchParks(stateCode?: string): Promise<ParksResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&stateCode=${stateCode ? '' : ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = parksResponseSchema.parse(json);
    return parsedData;
}

// TODO: Implement other fetch to hit other NPS.gov endpoints, maybe put in a diff hook
async function fetchOtherData(): Promise<unknown> {
    return new Promise((res, _rej) => res(200));
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
