import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {parkCode: string}}) {
    const {parkCode} = params;

    try {
        const apiKey = process.env.NEXT_PUBLIC_NPS_API_KEY;

        const response = await fetch(
            `https://developer.nps.gov/api/v1/mapdata/parkboundaries/${parkCode}?api_key=${apiKey}`
        );

        if (!response.ok) {
            return NextResponse.json({error: 'NPS API error'}, {status: 500});
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({error: error?.message ?? 'Unknown error'}, {status: 500});
    }
}
