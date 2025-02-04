import {Card, CardHeader, CardBody} from '@heroui/react';
import {Phone, Mail} from 'lucide-react';
import {Park} from '@/types/park-types';
import {FC} from 'react';

interface ContactCardProps {
    park: Park;
}

export const ContactCard: FC<ContactCardProps> = ({park}) => {
    return (
        <Card className='w-full h-fit border-none bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/20 dark:to-teal-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
            <CardHeader className='flex gap-3'>
                <Phone className='w-6 h-6 text-green-400 dark:text-green-300' />
                <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Contact Information</p>
            </CardHeader>
            <CardBody className='py-3'>
                <div className='space-y-4'>
                    <div>
                        <p className='text-medium font-medium text-gray-700 dark:text-gray-200 mb-2'>Phone Numbers</p>
                        <ul className='space-y-2'>
                            {park.contacts.phoneNumbers.map((number) => (
                                <li
                                    key={number.phoneNumber}
                                    className='flex items-center gap-2'
                                >
                                    <span className='text-small text-gray-600 dark:text-gray-400'>{number.type}:</span>
                                    <a
                                        href={`tel:${number.phoneNumber}`}
                                        className='text-small text-blue-600 dark:text-blue-400 hover:underline'
                                    >
                                        {number.phoneNumber}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className='text-medium font-medium text-gray-700 dark:text-gray-200 mb-2'>Email Addresses</p>
                        <ul className='space-y-2'>
                            {park.contacts.emailAddresses.map((email) => (
                                <li
                                    key={email.emailAddress}
                                    className='flex items-center gap-2'
                                >
                                    <Mail className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                                    <a
                                        href={`mailto:${email.emailAddress}`}
                                        className='text-small text-blue-600 dark:text-blue-400 hover:underline'
                                    >
                                        {email.emailAddress}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
