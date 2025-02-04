import {Card, CardHeader, CardBody} from '@heroui/react';
import {Cloud} from 'lucide-react';
import {Park} from '@/types/park-types';
import {FC} from 'react';

interface WeatherCardProps {
    park: Park;
}

export const WeatherCard: FC<WeatherCardProps> = ({park}) => {
    return (
        <Card className='w-full h-fit border-none bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
            <CardHeader className='flex gap-3'>
                <Cloud className='w-6 h-6 text-orange-400 dark:text-orange-300' />
                <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Weather</p>
            </CardHeader>
            <CardBody className='py-3'>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{park.weatherInfo}</p>
            </CardBody>
        </Card>
    );
};
