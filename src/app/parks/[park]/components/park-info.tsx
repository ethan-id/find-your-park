'use client';

import Link from 'next/link';
import {Alert, Spinner} from '@heroui/react';
import {AlertList} from './alert-list';
import {ImageRow} from './image-row';
import {useParks} from '@/hooks/use-parks';
import type {FC} from 'react';
import {VisitedCheckbox} from './visited-checkbox';
import {FavoritedCheckbox} from './favorite-checkbox';
import {ParkMap} from './park-map';
import {ParkBanner} from './park-banner';
import {ContactCard} from './contact-card';
import {WeatherCard} from './weather-card';
import {FeesCard} from './fees-card';
import {HoursCards} from './hours-cards';
import {RelatedFigures} from './related-figures';

interface ParkInfoProps {
    parkCode: string;
}

export const ParkInfo: FC<ParkInfoProps> = ({parkCode}) => {
    const {parks, loading, error} = useParks(parkCode);

    const park = parks?.[0];

    if (loading) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    if (!park || error) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <Alert
                        color={'danger'}
                        title={"Couldn't load park information, sorry 😕"}
                        variant={'solid'}
                    />
                    <Link href={'/'}>Head back home</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                    <ParkMap park={park} />
                    <ParkBanner park={park} />
                </div>

                <div className='flex gap-3'>
                    <VisitedCheckbox parkCode={parkCode} />
                    <FavoritedCheckbox parkCode={parkCode} />
                </div>
            </div>

            <div className='flex flex-col items-center min-h-screen gap-12 py-12 px-4'>
                <ImageRow
                    images={park.images}
                    title={'Images'}
                    isPeople={false}
                />
                <RelatedFigures parkCode={parkCode} />

                <div className='flex flex-col w-full max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto'>
                        {park.operatingHours && park.operatingHours.length > 0 && (
                            <HoursCards hours={park.operatingHours} />
                        )}

                        <ContactCard park={park} />

                        {park.weatherInfo && <WeatherCard park={park} />}

                        {park.entranceFees && park.entranceFees.length > 0 && <FeesCard fees={park.entranceFees} />}

                        {park.entrancePasses && park.entrancePasses.length > 0 && (
                            <FeesCard fees={park.entrancePasses} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
