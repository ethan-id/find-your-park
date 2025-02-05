import {MarkerData} from '@/types/location-types';
import {Park} from '@/types/park-types';
import {Campground} from '@/types/campgrounds-types';

export const convertSitesToMarkers = (sites: (Park | Campground)[] | null) => {
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

    return {markers};
};
