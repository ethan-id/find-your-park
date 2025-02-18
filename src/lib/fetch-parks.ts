import {ParksAPIResponse, Park, npsResponseSchema} from '@/types/park-types';

const API_KEY = process.env.NPS_API_KEY;

const LIMIT = 50;

export async function fetchParksChunk(start = 0, parkCode = ''): Promise<ParksAPIResponse> {
    const url = new URL('https://developer.nps.gov/api/v1/parks');
    url.searchParams.set('api_key', API_KEY || '');
    url.searchParams.set('limit', String(LIMIT));
    url.searchParams.set('start', String(start));
    if (parkCode) {
        url.searchParams.set('parkCode', parkCode);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Failed to fetch parks. Status: ${res.status}`);
    }
    
    console.warn(`Requests remaining this hour: ${res.headers.get('X-Ratelimit-Remaining')}/${res.headers.get('X-Ratelimit-Limit')}`);

    const json = await res.json();
    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export async function fetchAllParks(): Promise<Park[]> {
    // Hard-coded starts for known number of parks that the API responds with so that 
    // I can use Promise.allSettled to fire all the fetches at once
    const starts = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 474];
    let allParks: Park[] = [];

    const promises = starts.map((start) => fetchParksChunk(start));

    const responses = await Promise.allSettled(promises);
    responses.map((res) => {
        const {data} = (res as PromiseFulfilledResult<ParksAPIResponse>).value;
        const park = data;
        allParks.push(...park);
    });

    return allParks;
}
