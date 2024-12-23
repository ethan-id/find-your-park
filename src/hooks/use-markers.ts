import {useEffect, useState} from 'react';
import {MarkerData} from '@/types/location-types';
import {Park} from '@/types/park-types';

// TODO: Update to be able to use this for other types of markers as well that aren't markers for parks only
export const useMarkers = (parks: Park[] | null, parksLoading: boolean) => {
    const [parkMarkers, setParkMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        const markers: MarkerData[] = [];

        if (parks && parks?.length > 0) {
            for (const park of parks) {
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
