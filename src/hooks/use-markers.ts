import {useEffect, useState} from 'react';
import {MarkerData} from '@/types/location-types';
import {ParksResponse} from '@/types/park-types';

export const useMarkers = (parks: ParksResponse | null, parksLoading: boolean) => {
    const [parkMarkers, setParkMarkers] = useState<MarkerData[]>([]);

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

    return {parkMarkers};
};
