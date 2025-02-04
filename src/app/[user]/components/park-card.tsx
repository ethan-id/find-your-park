import {Card, CardHeader, CardBody} from '@heroui/card';
import {Chip} from '@heroui/chip';
import {Skeleton} from '@heroui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import type {FC} from 'react';
import {fetchParksChunk} from '@/lib/fetch-parks';

interface ParkCardProps {
    parkCode: string;
    favorite?: boolean;
    visited?: boolean;
}

export const ParkCard: FC<ParkCardProps> = async ({parkCode, favorite, visited}) => {
    const {data: parks} = await fetchParksChunk(0, parkCode);
    const park = parks[0];

    // TODO: Remove last usage of `use-parks.ts` hook
    // const {parks, loading, error} = useParks(parkCode);

    return (
        <Card className='max-w-sm bg-stone-800'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <div className='flex min-w-full justify-between'>
                    <Link
                        className='text-md md:text-xl'
                        href={`/parks/${park.parkCode}`}
                    >
                        {park?.name}
                    </Link>
                    <div className='flex gap-2'>
                        {favorite && <Chip color={'success'}>{'Favorite'}</Chip>}
                        {visited && <Chip color={'primary'}>{'Visited'}</Chip>}
                    </div>
                </div>
            </CardHeader>
            <CardBody className='flex items-center overflow-visible py-2 gap-2'>
                <>
                    <Image
                        alt={park?.name || 'Park image'}
                        className='object-cover rounded-xl'
                        src={park?.images[0]?.url || '/placeholder.svg'}
                        width={500}
                        height={500}
                    />
                </>
            </CardBody>
        </Card>
    );
};

export const ParkCardSkeleton = () => (
    <Card className='max-w-sm bg-stone-800'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <Skeleton className='h-6 w-3/4 rounded-lg' />
        </CardHeader>
        <CardBody className='flex items-center overflow-visible py-2 gap-2'>
            <Skeleton className='h-[200px] w-[330px] rounded-xl' />
        </CardBody>
    </Card>
);
