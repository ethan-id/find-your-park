'use client';

import {FunctionComponent, useEffect} from 'react';
import {Alert, Card, CardHeader, CardBody, Chip, Spinner} from '@nextui-org/react';
import {Map, useMap} from '@vis.gl/react-google-maps';
import Link from 'next/link';
import {Markers} from '@/components/markers';
import {ImageRow} from './image-row';
import {AlertList} from '@/components/alert-list';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import {useEvents} from '@/hooks/use-events';
import {useParks} from '@/hooks/use-parks';
import {usePeople} from '@/hooks/use-people';
import type {MarkerData} from '@/types/location-types';

interface ParkInfoProps {
    parkCode: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkCode}) => {
    const {parks, loading, error} = useParks(parkCode);
    // const {events} = useEvents(parkCode);
    const {people} = usePeople(parkCode);
    const map = useMap();

    const park = parks?.[0];

    useEffect(() => {
        if (!map) return;

        // TODO: Write hook that fetches `/mapdata/parkboundaries/{parkCode}` coordinates and draws them on the map of each
        // const parkBounds = useBoundaries(parkCode);

        // Example Polygon
        // Define the LatLng coordinates for the polygon's path.
        const triangleCoords = [
            {lat: 25.774, lng: -80.19},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.19}
        ];

        // Construct the polygon.
        const bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

        bermudaTriangle.setMap(map);
    }, [map]);

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
                    <Alert color={'danger'} title={"Couldn't load park information, sorry 😕"} variant={'solid'} />
                    <Link href={'/'}>Head back home</Link>
                </div>
            </div>
        );
    }

    const parkMarker: MarkerData = {
        park: park,
        location: {
            lat: Number(park.latitude),
            lng: Number(park.longitude)
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen gap-12 py-12 px-4'>
            <AlertList parkCode={park.parkCode} />

            {/* Map, Title, and Description */}
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                {/* Map */}
                <div className='flex-shrink-0 w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden'>
                    <Map
                        colorScheme='FOLLOW_SYSTEM'
                        defaultCenter={{
                            lat: Number(park.latitude),
                            lng: Number(park.longitude)
                        }}
                        defaultTilt={30}
                        defaultZoom={8}
                        mapId='DEMO_MAP_ID'
                        disableDefaultUI={true}
                        gestureHandling='greedy'
                        style={{width: '100%', height: '100%'}}
                        reuseMaps={true}
                        renderingType='VECTOR'
                    >
                        <Markers markers={[parkMarker]} />
                    </Map>
                </div>

                {/* Title and Description */}
                <div className='flex flex-col w-full md:w-2/3 text-left'>
                    <a
                        className='text-3xl font-semibold text-blue-600 hover:underline flex items-center gap-2'
                        target='_blank'
                        href={park.url}
                    >
                        {park.fullName}
                        <OpenInNewIcon />
                    </a>
                    <ul className='flex flex-row gap-4 py-4 w-full overflow-x-auto snap-x snap-mandatory'>
                        {park.activities.map((activity) => (
                            <li key={`${park.name}-${activity.id}`}>
                                <Chip key={`${park.name}-${activity.id}`} size={'sm'}>
                                    {activity.name}
                                </Chip>
                            </li>
                        ))}
                    </ul>

                    <p className='text-base leading-relaxed'>{park.description}</p>
                </div>
            </div>

            <ImageRow images={park.images} title={'Images'} />
            {people && people.length > 0 && (
                <ImageRow images={people.map((person) => person.images[0])} title={'Related Figures'} />
            )}

            <div className='flex flex-col w-full md:w-2/3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-around'>
                    {park.entranceFees && park.entranceFees.length > 0 && (
                        <Card className='w-auto/12 bg-[#18181b] row-span-3'>
                            <CardHeader>
                                <p className='text-2xl'>Entrance Fees</p>
                            </CardHeader>
                            <CardBody>
                                <ul className='space-y-8'>
                                    {park.entranceFees.map((fee) => (
                                        <li className='flex flex-col gap-2' key={fee.title}>
                                            <p>{`${fee.title} (${fee.cost})`}</p>
                                            <p>{fee.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardBody>
                        </Card>
                    )}

                    <Card className='w-auto bg-[#18181b] row-span-1'>
                        <CardHeader>
                            <p className='text-2xl'>Contact Information</p>
                        </CardHeader>
                        <CardBody>
                            <p className='text-lg'>Phone Number(s)</p>
                            <ul className='pb-4'>
                                {park.contacts.phoneNumbers.map((number) => (
                                    <li key={number.phoneNumber}>
                                        {number.type}
                                        {': '}
                                        {number.phoneNumber}
                                    </li>
                                ))}
                            </ul>

                            <p className='text-lg'>Email(s)</p>
                            <ul>
                                {park.contacts.emailAddresses.map((email) => (
                                    <li key={email.emailAddress}>
                                        {email.emailAddress}
                                        {email.description ? `(${email.description})` : ''}
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>

                    {park.weatherInfo && (
                        <Card className='w-auto bg-[#18181b]'>
                            <CardHeader>
                                <p className='text-2xl'>Weather</p>
                            </CardHeader>
                            <CardBody>{park.weatherInfo}</CardBody>
                        </Card>
                    )}

                    {park.operatingHours &&
                        park.operatingHours.length > 0 &&
                        park.operatingHours.map((location) => (
                            <Card
                                className='w-auto/12 bg-[#18181b]'
                                key={`${location.name}-card-${location.description}`}
                            >
                                <CardHeader>
                                    <p className='text-2xl'>{location.name}</p>
                                </CardHeader>
                                <CardBody>
                                    <p className='pb-2'>{location.description}</p>
                                    <ul>
                                        {Object.entries(location.standardHours).map(([day, hours]) => (
                                            <li key={`${park.name}-${location.name}-${day}-${hours}`}>
                                                <p className='capitalize'>{`${day}: ${hours}`}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardBody>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
};

/*
<div className='flex flex-col px-12 py-8'>
    <p className='text-3xl font-bold pb-4 flex-none'>Articles</p>
    <div className='overflow-auto flex-grow'>
        <ArticleList />
    </div>
</div>
 */
