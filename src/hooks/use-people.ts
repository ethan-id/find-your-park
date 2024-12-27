import {PeopleAPIResponse, peopleAPISchema, Person} from '@/types/people-types';
import {useState, useEffect} from 'react';

async function fetchPeople(parkCode?: string): Promise<PeopleAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/people?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode ?? ''}`;
    const res = await fetch(url);
    const json = await res.json();
    return peopleAPISchema.parse(json);
}

export function usePeople(parkCode?: string) {
    const [people, setPeople] = useState<Person[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchPeople(parkCode)
            .then((response) => {
                if (isMounted) {
                    setPeople(response.data);
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

    return {people, loading, error};
}
