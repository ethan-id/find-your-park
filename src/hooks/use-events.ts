import {Event, EventAPIResponse, eventAPISchema} from '@/types/events-types';
import {useState, useEffect} from 'react';

async function fetchEvents(parkCode: string): Promise<EventAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/events?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode}`;
    const res = await fetch(url);
    const json = await res.json();
    return eventAPISchema.parse(json);
}

// TODO: Add return type to all hooks!
export function useEvents(parkCode: string) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchEvents(parkCode)
            .then((response) => {
                setEvents(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return {events, loading, error};
}
