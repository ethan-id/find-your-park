import {MyMap} from '@/components/my-map';
import {fetchAllParks} from '@/lib/fetch-parks';
import {fetchAllCampgrounds} from '@/lib/fetch-campgrounds';

// Revalidate once every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function HomePage() {
    // 1. Fetch all the parks/campgrounds server-side (this runs at build time or during revalidation)
    const [parks, campgrounds] = await Promise.all([fetchAllParks(), fetchAllCampgrounds()]);

    // 2. Pass them down into your client component
    return (
        <div className='flex flex-row justify-between align-center bg-[#05080d] w-screen h-screen'>
            <MyMap
                parks={parks}
                campgrounds={campgrounds}
            />
        </div>
    );
}
