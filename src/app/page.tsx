'use client';

import {FunctionComponent, useEffect, useState} from 'react';
import {Map, APIProvider} from '@vis.gl/react-google-maps';

const Home: FunctionComponent = () => {
    const [apiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        setApiKey(process.env.GOOGLE_MAPS_API_KEY as string);
    }, [process.env.GOOGLE_MAPS_API_KEY]);

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </APIProvider>
    );
};

export default Home;
