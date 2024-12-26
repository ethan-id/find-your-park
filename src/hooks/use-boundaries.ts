'use client';

import {useState, useEffect} from 'react';

async function fetchBounds(parkCode: string): Promise<unknown> {
    const url = `https://developer.nps.gov/api/v1/mapdata/parkboundaries/${parkCode}?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

// TODO: Add return type to all hooks!
export function useBounds(parkCode: string) {
    const [bounds, setBounds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchBounds(parkCode)
            .then((response) => {
                setBounds(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {bounds, loading, error};
}
