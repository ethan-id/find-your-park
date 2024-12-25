'use client';

import {NextUIProvider} from '@nextui-org/react';
import {APIProvider} from '@vis.gl/react-google-maps';

export function Providers({children}: {children: React.ReactNode}) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <APIProvider apiKey={API_KEY}>
            <NextUIProvider>{children}</NextUIProvider>
        </APIProvider>
    );
}
