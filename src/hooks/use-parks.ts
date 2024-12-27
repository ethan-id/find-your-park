import {useState, useEffect} from 'react';
import {ParksAPIResponse, npsResponseSchema, Park} from '@/types/park-types';

async function fetchParks(parkCode?: string, start: number = 0): Promise<ParksAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&limit=50&start=${start}&parkCode=${parkCode ?? ''}`;
    const res = await fetch(url);
    const json = await res.json();
    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export function useParks(parkCode?: string) {
    const [parks, setParks] = useState<Park[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        async function loadAllParks() {
            try {
                setLoading(true);
                const initialResponse = await fetchParks(parkCode, 0);

                if (!isMounted) return;

                setTotal(Number(initialResponse.total));
                setParks(initialResponse.data);

                let currentCount = initialResponse.data.length;

                while (currentCount < Number(initialResponse.total) && isMounted) {
                    await new Promise((resolve) => {
                        timeoutId = setTimeout(resolve, 50);
                    });

                    if (!isMounted) return;

                    const nextResponse = await fetchParks(parkCode, currentCount);

                    if (!isMounted) return;

                    setParks((prevParks) => [...prevParks, ...nextResponse.data]);
                    currentCount += nextResponse.data.length;
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch parks'));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadAllParks();

        return () => {
            isMounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [parkCode]);

    return {
        parks,
        loading,
        error,
        total,
        progress: parks.length > 0 ? Math.round((parks.length / total) * 100) : 0
    };
}
