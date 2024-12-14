'use client';

import {FunctionComponent} from 'react';
import {ParksResponse} from '@/types/park-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
                <li key={park.id} className={'gap-2 py-2'}>
                    {park.images ? (
                        <div className='flex flex-row gap-4 justify-between max-h-56 snap-x snap-mandatory overflow-x-scroll'>
                            {park.images.map((image) => (
                                <img
                                    key={image.title}
                                    src={image.url}
                                    alt={image.altText ?? ''}
                                    className={'max-h-30 rounded-xl object-cover snap-always snap-center'}
                                />
                            ))}
                        </div>
                    ) : null}

                    <a
                        className='flex flex-row justify-between items-center text-lg font-semibold py-2'
                        target='_blank'
                        href={park.url}
                    >
                        {' '}
                        {park.fullName}
                        <OpenInNewIcon />
                    </a>
                    {park.description}
                </li>
            ))}
        </ul>
    );
};
