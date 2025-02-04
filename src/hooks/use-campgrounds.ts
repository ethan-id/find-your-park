import { CampgroundsResponse, campgroundsResponseSchema } from '@/types/campgrounds-types';
import {useState, useEffect} from 'react';

const buildURL = (start: number = 0): string => {
    let url = `https://developer.nps.gov/api/v1/campgrounds?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&limit=50&start=${start}`;
    return url;
};

async function fetchCamps(start: number = 0): Promise<CampgroundsResponse> {
    const url = buildURL(start);
    const res = await fetch(url);
    const json = await res.json();
    const parsedData = campgroundsResponseSchema.parse(json);
    return parsedData;
}

// TODO: Store parks in sessionStorage so that it is saved per browser session
export function useCampgrounds() {
    const [camps, setCamps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        async function loadAllParks() {
            try {
                setLoading(true);
                const initialResponse = await fetchCamps(0);

                if (!isMounted) return;

                setTotal(Number(initialResponse.total));
                setCamps(initialResponse.data);

                let currentCount = initialResponse.data.length;

                while (currentCount < Number(initialResponse.total) && isMounted) {
                    await new Promise((resolve) => {
                        timeoutId = setTimeout(resolve, 50);
                    });

                    if (!isMounted) return;

                    const nextResponse = await fetchCamps(currentCount);

                    if (!isMounted) return;

                    setCamps((prevCamps) => [...prevCamps, ...nextResponse.data]);
                    currentCount += nextResponse.data.length;
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch campgrounds'));
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
    }, []);

    return {
        camps,
        loading,
        error,
        total,
        progress: camps.length > 0 ? Math.round((camps.length / total) * 100) : 0
    };
}
