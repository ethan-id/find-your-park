import {ParksAPIResponse, Park, npsResponseSchema} from '@/types/park-types';

const API_KEY = process.env.NEXT_PUBLIC_NPS_API_KEY; // or process.env.NPS_API_KEY if you want it server-only

const LIMIT = 50; // we'll fetch in increments of 50

// Single request for a "page" of results:
export async function fetchParksChunk(start = 0, parkCode = ''): Promise<ParksAPIResponse> {
    // Build URL
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
    
    // Log out # of remaining requsts
    console.warn(`Requests remaining this hour: ${res.headers.get('X-Ratelimit-Remaining')}/${res.headers.get('X-Ratelimit-Limit')}`);

    const json = await res.json();
    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

/**
 * Fetch *all* parks by iterating over multiple pages.
 * Usually done server-side in Next.js to avoid many client requests.
 */
export async function fetchAllParks(parkCode = ''): Promise<Park[]> {
    let allParks: Park[] = [];
    let start = 0;
    let total = Infinity;

    while (allParks.length < total) {
        const {data, total: totalCount} = await fetchParksChunk(start, parkCode);
        if (data.length === 0) break; // no more data

        allParks = [...allParks, ...data];
        total = Number(totalCount);
        start += data.length;
    }

    return allParks;
}
