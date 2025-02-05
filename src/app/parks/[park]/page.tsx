import {npsResponseSchema, ParksAPIResponse} from '@/types/park-types';
import {AlertList} from './components/alert-list';
import {ImageRow} from './components/image-row';
import {VisitedCheckbox} from './components/visited-checkbox';
import {FavoritedCheckbox} from './components/favorite-checkbox';
import {ParkMap} from './components/park-map';
import {ParkBanner} from './components/park-banner';
import {ContactCard} from './components/contact-card';
import {WeatherCard} from './components/weather-card';
import {FeesCard} from './components/fees-card';
import {HoursCards} from './components/hours-cards';
import {RelatedFigures} from './components/related-figures';
import {PlacesResponse, placesResponseSchema} from '@/types/places-types';

async function fetchPlaces(parkCode: string): Promise<PlacesResponse> {
    const url = `https://developer.nps.gov/api/v1/places?api_key=${process.env.NPS_API_KEY}&parkCode=${parkCode}`;
    const res = await fetch(url);
    const json = await res.json();
    const parsedData = placesResponseSchema.parse(json);
    return parsedData;
}

async function fetchPark(parkCode: string): Promise<ParksAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NPS_API_KEY}&limit=1&parkCode=${parkCode}`;
    const res = await fetch(url);
    const json = await res.json();
    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export default async function Page({params}: {params: Promise<{park: string}>}) {
    const parkCode = (await params).park;
    const parks = await fetchPark(parkCode);
    const {data: places} = await fetchPlaces(parkCode);
    const park = parks.data[0];

    return (
        <div className='flex flex-col items-center min-h-screen py-6 px-4'>
            <AlertList parkCode={park.parkCode} />

            {/* Container for Map + Banner */}
            <div className='w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mt-4'>
                <ParkMap park={park} places={places} />
                <ParkBanner park={park} />
            </div>

            {/* Checkboxes */}
            <div className='flex flex-wrap gap-3 mt-2'>
                <VisitedCheckbox parkCode={parkCode} />
                <FavoritedCheckbox parkCode={parkCode} />
            </div>

            {/* Main content below */}
            <div className='flex flex-col items-center w-full max-w-7xl gap-12 py-12 px-4 mx-auto'>
                <p className='text-base leading-relaxed text-gray-300'>{park.description}</p>

                <ImageRow
                    images={park.images}
                    title={'Images'}
                    isPeople={false}
                />
                <RelatedFigures parkCode={parkCode} />

                <div className='flex flex-col w-full'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto'>
                        {park.operatingHours && park.operatingHours.length > 0 && (
                            <HoursCards hours={park.operatingHours} />
                        )}

                        <ContactCard park={park} />

                        {park.weatherInfo && <WeatherCard park={park} />}

                        {park.entranceFees && park.entranceFees.length > 0 && <FeesCard fees={park.entranceFees} />}

                        {park.entrancePasses && park.entrancePasses.length > 0 && (
                            <FeesCard fees={park.entrancePasses} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
