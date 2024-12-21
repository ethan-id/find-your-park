import {FunctionComponent, Suspense} from 'react';
import {ParksAPIResponse} from '@/types/park-types';
import {Skeleton} from '@nextui-org/react';
import SuspenseImage from '@/components/suspense-image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ParksListProps {
    parks: ParksAPIResponse | null;
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
                <li key={`${park.id}${park.fullName}`} className={'gap-2 py-2'}>
                    {park.images ? (
                        <div className='flex flex-row gap-4 justify-between max-h-56 snap-x snap-mandatory overflow-x-scroll'>
                            {park.images.map((image, i) => (
                                <Suspense fallback={<ImgFallback />} key={`${image.title}${i}`}>
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
        <Skeleton className='min-w-full rounded-lg'>
            <div className='min-h-52' />
        </Skeleton>
    );
};
