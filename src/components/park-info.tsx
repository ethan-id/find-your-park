'use client';

import {useParksContext} from '@/contexts/parks-context';
import {FunctionComponent} from 'react';
import {Skeleton} from '@nextui-org/react';
import {Suspense} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SuspenseImage from '@/components/suspense-image';

interface ParkInfoProps {
    parkID: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkID}) => {
    const {parks} = useParksContext();

    const park = parks?.find((park) => park.id === parkID);

    if (!park) {
        return <div>Park is still loading...</div>;
    }

    return (
        <div className='flex flex-col m-auto min-h-[100vh] max-w-[60vw]'>
            <a
                className='flex flex-row justify-between items-center text-3xl font-semibold py-2'
                target='_blank'
                href={park.url}
            >
                {' '}
                {park.fullName}
                <OpenInNewIcon />
            </a>

            {park.images ? (
                <div className='flex flex-row gap-4 justify-between min-h-72 max-w-72 snap-x snap-mandatory overflow-x-scroll'>
                    {park.images.map((image, i) => (
                        <Suspense fallback={<ImgFallback />} key={`${image.title}${i}`}>
                            <SuspenseImage src={image.url} alt={image.altText ?? ''} />
                        </Suspense>
                    ))}
                </div>
            ) : null}

            {park.description}
        </div>
    );
};

const ImgFallback = () => {
    return (
        <Skeleton className='min-w-full rounded-lg'>
            <div className='min-h-52' />
        </Skeleton>
    );
};
