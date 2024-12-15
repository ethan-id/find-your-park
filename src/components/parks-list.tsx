'use client';

import {FunctionComponent, Suspense} from 'react';
import {ParksResponse} from '@/types/park-types';
import SuspenseImage from '@/components/suspense-image';
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
                                <Suspense fallback={<ImgFallback />} key={image.title}>
                                    <SuspenseImage src={image.url} alt={image.altText ?? ''} />
                                </Suspense>
                            ))}
                        </div>
                    ) : null}

                    <a
                        className='flex flex-row justify-between items-center text-xl font-semibold py-2'
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

const ImgFallback = () => {
    return (
        <div className='min-h-52 min-w-full border border-x-white rounded-lg flex items-center justify-center'>
            Loading image
        </div>
    );
};
