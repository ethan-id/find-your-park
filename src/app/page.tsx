'use client';

import {FunctionComponent} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';

const Home: FunctionComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    const {error, loading, latitude, longitude} = useGeolocation();

    if (error) {
        return (
            <div className='flex m-24 justify-center text-3xl'>
                Please give me permissions 😔
            </div>
        );
    }

    return (
        <APIProvider apiKey={API_KEY}>
            <p className='px-8 pb-4 pt-8 text-xl font-bold'>
                Hmmmm, where is that national park? 🤔
            </p>
            <div className='flex justify-center align-center py-16 px-16'>
                {!loading ? (
                    <MyMap
                        longitude={longitude as number}
                        latitude={latitude as number}
                    />
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
