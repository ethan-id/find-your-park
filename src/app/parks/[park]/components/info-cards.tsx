import {Park} from '@/types/park-types';
import {FC} from 'react';
import {ContactCard} from './contact-card';
import {WeatherCard} from './weather-card';
import {FeesCard} from './fees-card';
import {HoursCards} from './hours-cards';
import Masonry from '@mui/lab/Masonry';

interface InfoCardsProps {
    park: Park;
}

export const InfoCards: FC<InfoCardsProps> = ({park}) => {
    return (
        <div className='flex flex-col justify-center w-full'>
            <div className='hidden md:block'>
                <Masonry
                    columns={3}
                    spacing={4}
                >
                    <InfoCardsInner park={park} />
                </Masonry>
            </div>
            <div className='block md:hidden'>
                <Masonry
                    columns={1}
                    spacing={4}
                >
                    <InfoCardsInner park={park} />
                </Masonry>
            </div>
        </div>
    );
};

const InfoCardsInner: FC<InfoCardsProps> = ({park}) => (
    <>
        {park.entranceFees && park.entranceFees.length > 0 && <FeesCard fees={park.entranceFees} />}
        {park.operatingHours && park.operatingHours.length > 0 && <HoursCards hours={park.operatingHours} />}
        <ContactCard park={park} />
        {park.weatherInfo && <WeatherCard park={park} />}
        {park.entrancePasses && park.entrancePasses.length > 0 && <FeesCard fees={park.entrancePasses} />}
    </>
);
