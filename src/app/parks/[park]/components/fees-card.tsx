'use client';

import {Park} from '@/types/park-types';
import {FC} from 'react';
import {Card, CardHeader, CardBody} from '@heroui/react';
import {Wallet} from 'lucide-react';

interface FeesCardProps {
    fees: Park['entrancePasses'] | Park['entranceFees']
}

export const FeesCard: FC<FeesCardProps> = ({fees}) => {
    return (
        <Card className='w-full h-fit border-none bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
            <CardHeader className='flex gap-3'>
                <Wallet className='w-6 h-6 text-purple-400 dark:text-purple-300' />
                <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Entrance Fees</p>
            </CardHeader>
            <CardBody className='py-3'>
                <ul className='space-y-6'>
                    {fees?.map((fee, i) => (
                        <li
                            className='flex flex-col gap-2'
                            key={`${fee.title}-${i}`}
                        >
                            <p className='font-medium text-gray-700 dark:text-gray-200'>
                                {`${fee.title} `}
                                <span className='text-blue-600 dark:text-blue-400'>${fee.cost}</span>
                            </p>
                            <p className='text-small text-gray-600 dark:text-gray-400'>{fee.description}</p>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
};
