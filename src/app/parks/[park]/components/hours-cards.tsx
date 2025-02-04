import {Park} from '@/types/park-types';
import {FC} from 'react';
import {Card, CardHeader, CardBody} from '@heroui/react';
import {Clock} from 'lucide-react';

interface HoursCardProps {
    hours: Park['operatingHours'];
}

export const HoursCards: FC<HoursCardProps> = ({hours}) => {
    return hours?.map((location) => (
        <Card
            className='w-full h-fit border-none bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'
            key={`${location.name}-card-${location.description}`}
        >
            <CardHeader className='flex gap-3'>
                <Clock className='w-6 h-6 text-blue-400 dark:text-blue-300' />
                <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>{location.name} Hours</p>
            </CardHeader>
            <CardBody className='py-3'>
                <p className='text-small text-gray-600 dark:text-gray-400 mb-4'>{location.description}</p>
                <ul className='space-y-2'>
                    {Object.entries(location.standardHours).map(([day, hours]) => (
                        <li
                            key={`${location.name}-${day}-${hours}`}
                            className='flex justify-between'
                        >
                            <span className='capitalize text-gray-700 dark:text-gray-200'>{day}</span>
                            <span className='text-blue-600 dark:text-blue-400'>{hours}</span>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    ));
};
