'use client';

import {FunctionComponent, useState} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';
import {ParksList} from '@/components/parks-list';
import {useReverseGeocode} from '@/hooks/use-reverse-geocode';
import {useParks} from '@/hooks/use-parks';

const Home: FunctionComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const [mapsLoaded, setMapsLoaded] = useState(false);

    const {error: geoError, loading: geoLoading, latitude, longitude} = useGeolocation();

    // Only call useReverseGeocode if we actually have latitude and longitude.
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

    return (
        <APIProvider apiKey={API_KEY} onLoad={() => setMapsLoaded(true)}>
            <div className='flex flex-row justify-center align-center py-16 px-16'>
                {!loading ? (
                    <>
                        <div className='flex flex-col'>
                            <p className='py-8 text-xl font-bold'>Hmmmm, where is that national park? 🤔</p>
                            {geoCodeError && <p className='text-red-500'>Error: {geoCodeError.message}</p>}
                            <ParksList parks={parks} loading={parksLoading} error={parksErr} />
                        </div>
                        {typeof longitude === 'number' && typeof latitude === 'number' && (
                            <MyMap longitude={longitude} latitude={latitude} />
                        )}
                    </>
                ) : (
                    <div className='flex justify-center text-bold w-[80vw] h-[80vh] text-3xl'>
                        Waiting on those location permissions pookie 😘
                    </div>
                )}
            </div>
        </APIProvider>
    );
};

export default Home;
