'use client';

import {ParksResponse, parksResponseSchema} from '@/types/park-types';
import {FunctionComponent, useEffect, useState} from 'react';

const fetchParks = async (): Promise<ParksResponse> => {
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=IA&api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = parksResponseSchema.parse(json);

    return parsedData;
};

export const ParksList: FunctionComponent = () => {
    const [parks, setParks] = useState<ParksResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchParks()
            .then((data) => {
                if (isMounted) {
                    setParks(data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setErr(error);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <p>Loading parks...</p>;
    }

    if (err) {
        return <p>Error: {err.message}</p>;
    }

    return (
        <ul>
            {parks?.data.map((park) => (
                <li key={park.id}>
                    <h2> - {park.fullName}</h2>
                </li>
            ))}
        </ul>
    );
};
