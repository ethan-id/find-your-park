'use client';

import {Park} from '@/types/park-types';
import {Chip} from '@heroui/react';
import {FC} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ParkBannerProps {
    park: Park;
}

export const ParkBanner: FC<ParkBannerProps> = ({park}) => {
    return (
        <div className='relative flex flex-col w-full md:w-2/3 text-left min-h-[300px] md:min-h-[400px] mt-4 md:mt-0 rounded-lg overflow-hidden'>
            <img
                src={park.images[0].url || '/placeholder.svg'}
                alt={park.images[0].altText ?? 'Image alt text'}
                className='absolute inset-0 w-full h-full object-cover rounded-lg'
            />
            <div className='relative mt-auto'>
                <div className='backdrop-blur-xs bg-black/90 dark:bg-gray-800/75 p-4 rounded-lg'>
                    <a
                        className='text-3xl font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2'
                        target='_blank'
                        href={park.url}
                        rel='noreferrer'
                    >
                        {park.fullName}
                        <OpenInNewIcon />
                    </a>
                    <ul className='flex flex-row gap-4 py-4 w-full overflow-x-auto snap-x snap-mandatory'>
                        {park.activities.map((activity) => (
                            <li key={`${park.name}-${activity.id}`}>
                                <Chip
                                    key={`${park.name}-${activity.id}`}
                                    size='sm'
                                >
                                    {activity.name}
                                </Chip>
                            </li>
                        ))}
                    </ul>
                    <p className='text-base leading-relaxed text-gray-300'>{park.description}</p>
                </div>
            </div>
        </div>
    );
};
