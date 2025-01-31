'use client';

import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Map} from '@vis.gl/react-google-maps';
import {Alert, Card, CardHeader, CardBody, Chip, Spinner} from '@heroui/react';
import {Markers} from '@/components/markers';
import {AlertList} from '@/components/alert-list';
import {ImageRow} from '@/components/image-row';
import {useParks} from '@/hooks/use-parks';
import {usePeople} from '@/hooks/use-people';
import {useBounds} from '@/hooks/use-bounds';
import {usePlaces} from '@/hooks/use-places';
import {Clock, Phone, Mail, Cloud, Wallet} from 'lucide-react';
import type {FunctionComponent} from 'react';
import type {MarkerData} from '@/types/location-types';
import {VisitedCheckbox} from './visited-checkbox';
import {FavoritedCheckbox} from './favorite-checkbox';

interface ParkInfoProps {
    parkCode: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkCode}) => {
    useBounds(parkCode);
    const {parks, loading, error} = useParks(parkCode);
    const {people} = usePeople(parkCode);
    const {places} = usePlaces(parkCode);

    let markers: MarkerData[] = [];

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

    if (places) {
        markers = places.map((place) => ({
            label: place.title,
            location: {
                lat: Number(place.latitude),
                lng: Number(place.longitude)
            }
        }));
    }

    const parkMarker: MarkerData = {
        label: park.fullName,
        location: {
            lat: Number(park.latitude),
            lng: Number(park.longitude)
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen py-12 px-4'>
            <AlertList parkCode={park.parkCode} />

            <div>
                {/* Map, Title, and Description */}
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                    {/* Map */}
                    <div className='flex-shrink-0 w-full md:w-1/3 aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                        <Map
                            colorScheme='FOLLOW_SYSTEM'
                            defaultCenter={{
                                lat: Number(park.latitude),
                                lng: Number(park.longitude)
                            }}
                            defaultTilt={60}
                            defaultZoom={10}
                            mapId='DEMO_MAP_ID'
                            disableDefaultUI={true}
                            gestureHandling='greedy'
                            style={{width: '100%', height: '100%'}}
                            reuseMaps={true}
                            renderingType='VECTOR'
                        >
                            <Markers markers={[parkMarker, ...markers]} />
                        </Map>
                    </div>

                    {/* Title and Description */}
                    <div className='relative flex flex-col w-full md:w-2/3 text-left min-h-[400px]'>
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
                                                size={'sm'}
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
                {people && people.length > 0 && (
                    <ImageRow
                        images={people.map((person) => person.images[0])}
                        title={'Related Figures'}
                        isPeople
                    />
                )}

                <div className='flex flex-col w-full max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto'>
                        {park.operatingHours &&
                            park.operatingHours.length > 0 &&
                            park.operatingHours.map((location) => (
                                <Card
                                    className='w-full h-fit border-none bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'
                                    key={`${location.name}-card-${location.description}`}
                                >
                                    <CardHeader className='flex gap-3'>
                                        <Clock className='w-6 h-6 text-blue-400 dark:text-blue-300' />
                                        <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
                                            {location.name} Hours
                                        </p>
                                    </CardHeader>
                                    <CardBody className='py-3'>
                                        <p className='text-small text-gray-600 dark:text-gray-400 mb-4'>
                                            {location.description}
                                        </p>
                                        <ul className='space-y-2'>
                                            {Object.entries(location.standardHours).map(([day, hours]) => (
                                                <li
                                                    key={`${park.name}-${location.name}-${day}-${hours}`}
                                                    className='flex justify-between'
                                                >
                                                    <span className='capitalize text-gray-700 dark:text-gray-200'>
                                                        {day}
                                                    </span>
                                                    <span className='text-blue-600 dark:text-blue-400'>{hours}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardBody>
                                </Card>
                            ))}

                        <Card className='w-full h-fit border-none bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/20 dark:to-teal-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
                            <CardHeader className='flex gap-3'>
                                <Phone className='w-6 h-6 text-green-400 dark:text-green-300' />
                                <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
                                    Contact Information
                                </p>
                            </CardHeader>
                            <CardBody className='py-3'>
                                <div className='space-y-4'>
                                    <div>
                                        <p className='text-medium font-medium text-gray-700 dark:text-gray-200 mb-2'>
                                            Phone Numbers
                                        </p>
                                        <ul className='space-y-2'>
                                            {park.contacts.phoneNumbers.map((number) => (
                                                <li
                                                    key={number.phoneNumber}
                                                    className='flex items-center gap-2'
                                                >
                                                    <span className='text-small text-gray-600 dark:text-gray-400'>
                                                        {number.type}:
                                                    </span>
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
                                        <p className='text-medium font-medium text-gray-700 dark:text-gray-200 mb-2'>
                                            Email Addresses
                                        </p>
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

                        {park.weatherInfo && (
                            <Card className='w-full h-fit border-none bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
                                <CardHeader className='flex gap-3'>
                                    <Cloud className='w-6 h-6 text-orange-400 dark:text-orange-300' />
                                    <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Weather</p>
                                </CardHeader>
                                <CardBody className='py-3'>
                                    <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                                        {park.weatherInfo}
                                    </p>
                                </CardBody>
                            </Card>
                        )}

                        {park.entranceFees && park.entranceFees.length > 0 && (
                            <Card className='w-full h-fit border-none bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
                                <CardHeader className='flex gap-3'>
                                    <Wallet className='w-6 h-6 text-purple-400 dark:text-purple-300' />
                                    <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
                                        Entrance Fees
                                    </p>
                                </CardHeader>
                                <CardBody className='py-3'>
                                    <ul className='space-y-6'>
                                        {park.entranceFees.map((fee, i) => (
                                            <li
                                                className='flex flex-col gap-2'
                                                key={`${fee.title}-${i}`}
                                            >
                                                <p className='font-medium text-gray-700 dark:text-gray-200'>
                                                    {`${fee.title} `}
                                                    <span className='text-blue-600 dark:text-blue-400'>
                                                        ${fee.cost}
                                                    </span>
                                                </p>
                                                <p className='text-small text-gray-600 dark:text-gray-400'>
                                                    {fee.description}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBody>
                            </Card>
                        )}

                        {park.entrancePasses && park.entrancePasses.length > 0 && (
                            <Card className='w-full h-fit border-none bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300'>
                                <CardHeader className='flex gap-3'>
                                    <Wallet className='w-6 h-6 text-purple-400 dark:text-purple-300' />
                                    <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
                                        Entrance Passes
                                    </p>
                                </CardHeader>
                                <CardBody className='py-3'>
                                    <ul className='space-y-6'>
                                        {park.entrancePasses.map((fee, i) => (
                                            <li
                                                className='flex flex-col gap-2'
                                                key={`${fee.title}-${i}`}
                                            >
                                                <p className='font-medium text-gray-700 dark:text-gray-200'>
                                                    {`${fee.title} `}
                                                    <span className='text-blue-600 dark:text-blue-400'>
                                                        ${fee.cost}
                                                    </span>
                                                </p>
                                                <p className='text-small text-gray-600 dark:text-gray-400'>
                                                    {fee.description}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
