import {CampgroundsResponse, Campground, campgroundsResponseSchema} from '@/types/campgrounds-types';

const API_KEY = process.env.NEXT_PUBLIC_NPS_API_KEY; // or process.env.NPS_API_KEY if you want it server-only
const LIMIT = 50;

async function fetchCampgroundsChunk(start = 0): Promise<CampgroundsResponse> {
    const url = new URL('https://developer.nps.gov/api/v1/campgrounds');
    url.searchParams.set('api_key', API_KEY || '');
    url.searchParams.set('limit', String(LIMIT));
    url.searchParams.set('start', String(start));

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Failed to fetch campgrounds. Status: ${res.status}`);
    }

    const json = await res.json();
    const parsedData = campgroundsResponseSchema.parse(json);
    return parsedData;
}

export async function fetchAllCampgrounds(): Promise<Campground[]> {
    let allCamps: Campground[] = [];
    let start = 0;
    let total = Infinity;

    while (allCamps.length < total) {
        const {data, total: totalCount} = await fetchCampgroundsChunk(start);
        if (data.length === 0) break;

        allCamps = [...allCamps, ...data];
        total = Number(totalCount);
        start += data.length;
    }

    return allCamps;
}
