'use client';

import {FunctionComponent, useState, useEffect} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {MarkerData} from '@/types/location-types';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';
import {ParksList} from '@/components/parks-list';
import {useReverseGeocode} from '@/hooks/use-reverse-geocode';
import {useParks} from '@/hooks/use-parks';

const Home: FunctionComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [parkMarkers, setParkMarkers] = useState<MarkerData[]>([]);

    const {error: geoError, loading: geoLoading, latitude, longitude} = useGeolocation();

    const {
        result,
        error: geoCodeError,
        loading: geoCodeLoading
    } = useReverseGeocode({
        latitude: typeof latitude === 'number' ? latitude : undefined,
        longitude: typeof longitude === 'number' ? longitude : undefined,
        mapsLoaded
    });

    const loading = geoLoading || geoCodeLoading;

    if (geoError) {
        return <div className='flex m-24 justify-center text-3xl'>Please give me permissions 😔</div>;
    }

    const stateCode = result?.stateCode ?? '';

    const {parks, loading: parksLoading, error: parksErr} = useParks(stateCode);

    useEffect(() => {
        const markers: MarkerData[] = [];

        if (parks && parks?.data.length > 0) {
            for (const park of parks?.data) {
                markers.push({
                    park: park,
                    location: {lat: Number(park.latitude), lng: Number(park.longitude)}
                });
            }
        }

        setParkMarkers(markers);
    }, [parks, parksLoading]);

    return (
        <APIProvider apiKey={API_KEY} onLoad={() => setMapsLoaded(true)}>
            <div className='flex flex-row justify-center align-center bg-[#05080d]'>
                {!loading ? (
                    <>
                        <div className='flex flex-col px-12 py-8'>
                            <p className='text-3xl font-bold pb-4'>Here are some landmarks, those nearest to you.</p>

                            {geoCodeError && <p className='text-red-500'>Error: {geoCodeError.message}</p>}

                            <ParksList parks={parks} loading={parksLoading} error={parksErr} />
                        </div>

                        {typeof longitude === 'number' && typeof latitude === 'number' && (
                            <MyMap parkMarkers={parkMarkers} longitude={longitude} latitude={latitude} />
                        )}
                    </>
                ) : (
                    <div className='flex justify-center items-center text-bold w-[100vw] h-[100vh] text-4xl'>
                        Waiting on those location permissions pookie 😘
                    </div>
                )}
            </div>
        </APIProvider>
    );
};

export default Home;
