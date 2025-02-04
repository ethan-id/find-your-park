import {useEffect, useState} from 'react';
import {MarkerData} from '@/types/location-types';
import {Park} from '@/types/park-types';
import {Campground} from '@/types/campgrounds-types';

export const useSiteMarkers = (sites: (Park | Campground)[] | null, loading: boolean) => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        const markers: MarkerData[] = [];

        if (sites && sites?.length > 0) {
            for (const site of sites) {
                markers.push({
                    label: site.name,
                    linkHref: `/parks/${site.parkCode}`,
                    location: {lat: Number(site.latitude), lng: Number(site.longitude)}
                });
            }
        }

        setMarkers(markers);
    }, [sites, loading]);

    return {markers};
};
