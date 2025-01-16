import {useState, useEffect} from 'react';

async function fetchCampgrounds(): Promise<any> {
    const url = `https://developer.nps.gov/api/v1/campgrounds?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();
    console.log('campgrounds', json);
    //const parsedData = articleResponseSchema.parse(json);
    //return parsedData;
}

export function useCampgrounds() {
    const [campgrounds, setCampgrounds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchCampgrounds()
            .then((response) => {
                setCampgrounds(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return {campgrounds, loading, error};
}
