'use client';

import {Card, CardHeader, CardBody} from '@heroui/card';
import {Chip} from '@heroui/chip';
import {Skeleton} from '@heroui/skeleton';
import {useParks} from '@/hooks/use-parks';
import Image from 'next/image';
import Link from 'next/link';
import type {FC} from 'react';

interface ParkCardProps {
    parkCode: string;
    favorite?: boolean;
    visited?: boolean;
}

export const ParkCard: FC<ParkCardProps> = ({parkCode, favorite, visited}) => {
    const {parks, loading, error} = useParks(parkCode);

    if (error) {
        return (
            <Card className='max-w-sm'>
                <CardBody>
                    <p className='text-red-500'>Error loading park data</p>
                </CardBody>
            </Card>
        );
    }

    const park = parks?.[0];

    return (
        <Card className='max-w-sm bg-stone-800'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                {loading ? (
                    <Skeleton className='h-6 w-3/4 rounded-lg' />
                ) : (
                    <div className='flex min-w-full justify-between'>
                        <Link className='text-md md:text-xl' href={`/parks/${park.parkCode}`}>{park?.name}</Link>
                        <div className='flex gap-2'>
                            {favorite && <Chip color={'success'}>{'Favorite'}</Chip>}
                            {visited && <Chip color={'primary'}>{'Visited'}</Chip>}
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardBody className='flex items-center overflow-visible py-2 gap-2'>
                {loading && park?.images?.length && park?.images?.length > 0 ? (
                    <Skeleton className='h-[350px] w-[450px] rounded-xl' />
                ) : (
                    <>
                        <Image
                            alt={park?.name || 'Park image'}
                            className='object-cover rounded-xl'
                            src={park?.images[0]?.url || '/placeholder.svg'}
                            width={500}
                            height={500}
                        />
                    </>
                )}
            </CardBody>
        </Card>
    );
};
