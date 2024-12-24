'use client';

import {useParksContext} from '@/contexts/parks-context';
import {FunctionComponent} from 'react';
import {Skeleton, Spinner, Alert} from '@nextui-org/react';
import {Alert as AlertType} from '@/types/alert-types';
import {Suspense} from 'react';
import {useAlerts} from '@/hooks/use-alerts';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SuspenseImage from '@/components/suspense-image';

interface ParkInfoProps {
    parkID: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkID}) => {
    const {parks} = useParksContext();

    // TODO: Replace with fetch to `/parks?parkCode=${parkID}`???
    const park = parks?.find((park) => park.id === parkID);

    if (!park) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    const {alerts} = useAlerts(park.parkCode);
    const filterRecentEvents = (alerts: AlertType[]) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return alerts.filter((alert) => {
            const eventDate = new Date(alert.lastIndexedDate);
            return eventDate >= sevenDaysAgo;
        });
    };
    const filteredAlerts = filterRecentEvents(alerts);

    // TODO: Add zoomed in map on park location
    return (
        <div className='flex flex-col items-center min-h-screen gap-32'>
            <div className='flex flex-col items-center justify-center px-4'>
                <div className='flex flex-col gap-8 p-12'>
                    {filteredAlerts.length > 0 &&
                        filteredAlerts.map((alert, i) => (
                            <Alert
                                key={`alert-${i}`}
                                color={'warning'}
                                title={new Date(alert.lastIndexedDate).toLocaleString()}
                                description={alert.description}
                            />
                        ))}
                </div>
                <a
                    className='text-3xl font-semibold text-blue-600 hover:underline flex items-center gap-2 mb-6'
                    target='_blank'
                    href={park.url}
                >
                    {park.name}
                    <OpenInNewIcon />
                </a>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl'>
                    <div className='flex-shrink-0 w-full md:w-1/3'>
                        {park.images && park.images.length > 0 ? (
                            <Suspense fallback={<ImgFallback />}>
                                <SuspenseImage
                                    src={park.images[0].url}
                                    alt={park.images[0].altText ?? 'Park Image'}
                                    className='w-full aspect-square rounded-lg object-cover'
                                    key={park.images[0].url}
                                />
                            </Suspense>
                        ) : null}
                    </div>

                    <div className='flex flex-col w-full md:w-2/3 text-left'>
                        <h2 className='text-xl font-semibold mb-4'>{park.fullName}</h2>
                        <p className='text-base leading-relaxed'>{park.description}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-4 max-w-[50vw] max-h-[70vh] snap-x snap-mandatory overflow-x-scroll'>
                {/* TODO: Add visual notifier that the user can scroll through these images, rn it looks like just one */}
                {park.images && park.images.length > 0
                    ? park.images.slice(1).map((image, i) => (
                          <Suspense
                              fallback={<ImgFallback key={`img-fallback-${i}`} className='min-w-[50vw] min-h-[50vh]' />}
                          >
                              <SuspenseImage
                                  src={image.url}
                                  alt={image.altText ?? 'Park Image'}
                                  className='rounded-xl object-cover snap-always snap-center w-full aspect-square'
                                  key={`${image.url}${image.title}`}
                              />
                          </Suspense>
                      ))
                    : null}
            </div>
        </div>
    );
};

interface ImgFallbackProps {
    className?: string;
}

const ImgFallback: FunctionComponent<ImgFallbackProps> = ({className}) => {
    return (
        <Skeleton className={`w-full aspect-square rounded-lg ${className}`}>
            <div className='h-full' />
        </Skeleton>
    );
};
