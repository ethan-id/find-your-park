'use client';

import {FunctionComponent} from 'react';
import {ParksResponse} from '@/types/park-types';

interface ParksListProps {
    parks: ParksResponse | null;
    loading: boolean;
    error: Error | null;
}

export const ParksList: FunctionComponent<ParksListProps> = ({parks, loading, error}) => {
    if (loading) {
        return <p>Loading parks...</p>;
    }

    if (error) {
        return <p>Uh oh! We couldn't fetch the parks ☹️</p>;
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
