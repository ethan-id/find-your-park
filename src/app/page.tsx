'use client';

import {FunctionComponent} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';
import {ParksList} from '@/components/parks-list';
import {useReverseGeocode} from '@/hooks/use-reverse-geocode';

const Home: FunctionComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    const {error, loading: geoLoading, latitude, longitude} = useGeolocation();
    const {
        result,
        error: geoCodeErr,
        loading: geoCodeLoading
    } = useReverseGeocode({
        latitude: latitude as number,
        longitude: longitude as number
    });

    if (error) {
        return <div className='flex m-24 justify-center text-3xl'>Please give me permissions 😔</div>;
    }

    const loading = geoLoading || geoCodeLoading;
    const stateCode = result?.stateCode ?? '';

    return (
        <APIProvider apiKey={API_KEY}>
            <div className='flex flex-row justify-center align-center py-16 px-16'>
                {!loading ? (
                    <>
                        <div className='flex flex-col'>
                            <p className='py-8 text-xl font-bold'>Hmmmm, where is that national park? 🤔</p>
                            {!geoCodeErr ? <ParksList state={stateCode} /> : <p>Couldn't find what state you're in</p>}
                            test
                        </div>

                        <MyMap longitude={longitude as number} latitude={latitude as number} />
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
