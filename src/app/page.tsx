import {MyMap} from '@/components/my-map';
import {fetchAllParks} from '@/lib/fetch-parks';
import {fetchAllCampgrounds} from '@/lib/fetch-campgrounds';

// Revalidate this route's fetch calls once every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function HomePage() {
    // 1. Fetch all the parks/campgrounds server-side (this runs at build time or during revalidation)
    const [parks, campgrounds] = await Promise.all([fetchAllParks(), fetchAllCampgrounds()]);

    return (
        <div className='overflow-hidden'>
            <div className='flex flex-row justify-between align-center bg-[#05080d]'>
                <MyMap
                    parks={parks}
                    campgrounds={campgrounds}
                />
            </div>
        </div>
    );
}
