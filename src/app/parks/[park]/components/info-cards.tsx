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
        <div className='flex flex-col w-full'>
            <Masonry
                columns={3}
                spacing={4}
            >
                {park.entranceFees && park.entranceFees.length > 0 && <FeesCard fees={park.entranceFees} />}
                {park.operatingHours && park.operatingHours.length > 0 && <HoursCards hours={park.operatingHours} />}
                <ContactCard park={park} />
                {park.weatherInfo && <WeatherCard park={park} />}
                {park.entrancePasses && park.entrancePasses.length > 0 && <FeesCard fees={park.entrancePasses} />}
            </Masonry>
        </div>
    );
};
