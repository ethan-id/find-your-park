import {CampgroundsResponse, Campground, campgroundsResponseSchema} from '@/types/campgrounds-types';

const API_KEY = process.env.NPS_API_KEY;
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
    // Hard-coded starts for known number of campgrounds that the API responds with so that
    // I can use Promise.allSettled to fire all the fetches at once
    const starts = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650];
    let allCamps: Campground[] = [];

    const promises = starts.map((start) => fetchCampgroundsChunk(start));

    const responses = await Promise.allSettled(promises);
    responses.map((res) => {
        const {data} = (res as PromiseFulfilledResult<CampgroundsResponse>).value;
        const park = data;
        allCamps.push(...park);
    });

    return allCamps;
}
