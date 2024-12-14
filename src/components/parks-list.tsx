'use client';

import {FunctionComponent} from 'react';
import {useParks} from '@/hooks/use-parks';

interface ParksListProps {
    state: string;
}

export const ParksList: FunctionComponent<ParksListProps> = ({state}) => {
    const {parks, loading, error} = useParks(state);

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
