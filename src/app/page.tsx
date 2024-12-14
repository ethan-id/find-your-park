'use client';

import {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {APIProvider, useMapsLibrary} from '@vis.gl/react-google-maps';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';
import {ParksList} from '@/components/parks-list';

const Home: FunctionComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const [stateCode, setStateCode] = useState<string>('');

    const {error, loading, latitude, longitude} = useGeolocation();

    const geocoder = useMemo(() => {
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
            return new google.maps.Geocoder();
        }
        return null;
    }, [typeof window, window.google]);

    useEffect(() => {
        if (!geocoder || loading || latitude === undefined || longitude === undefined) return;

        geocoder.geocode({location: {lat: latitude as number, lng: longitude as number}}, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
                const addrComponents = results[0].address_components;
                const state = addrComponents.find((comp) => comp.types.includes('administrative_area_level_1'));

                if (state) {
                    setStateCode(state.short_name);
                    console.log('Detected state code:', state.short_name);
                } else {
                    console.error('Couldn’t find state code for this location.');
                }
            } else {
                console.error('Geocoding failed:', status);
            }
        });
    }, [geocoder, loading, latitude, longitude]);

    if (error) {
        return <div className='flex m-24 justify-center text-3xl'>Please give me permissions 😔</div>;
    }

    return (
        <APIProvider apiKey={API_KEY}>
            <div className='flex flex-row justify-center align-center py-16 px-16'>
                {!loading ? (
                    <>
                        <div className='flex flex-col'>
                            <p className='py-8 text-xl font-bold'>Hmmmm, where is that national park? 🤔</p>

                            <ParksList state={stateCode} />
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
