import {npsResponseSchema, ParksAPIResponse} from '@/types/park-types';
import {ParkInfo} from './components/park-info';
import {AlertList} from './components/alert-list';

const buildURL = (parkCode: string): string => {
    let url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&limit=1&parkCode=${parkCode}`;
    return url;
};

async function fetchPark(parkCode: string): Promise<ParksAPIResponse> {
    const url = buildURL(parkCode);
    const res = await fetch(url);
    const json = await res.json();
    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export default async function Page({params}: {params: Promise<{park: string}>}) {
    const parkCode = (await params).park;

    const parks = await fetchPark(parkCode);

    const park = parks.data[0];

    console.log(parks);

    return (
        <div className='flex flex-col items-center min-h-screen py-12 px-4'>
            <AlertList parkCode={park.parkCode} />

            <ParkInfo parkCode={parkCode} />
        </div>
    );
}
