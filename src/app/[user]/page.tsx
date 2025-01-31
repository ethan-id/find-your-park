import {supabase} from '@/lib/supabaseClient';
import {ParkCard} from '@/components/park-card';

async function getUserParksData(userID: string) {
    const {data: visitedParks, error: visitedError} = await supabase
        .from('visited_parks')
        .select('park_id')
        .eq('user_id', userID);

    const {data: favoriteParks, error: favoriteError} = await supabase
        .from('favorite_parks')
        .select('park_id')
        .eq('user_id', userID);

    interface UserPark {
        park_id: string;
        favorite?: boolean;
        visited?: boolean;
    }

    const parks: UserPark[] = [];

    favoriteParks?.map((park: any) => {
        park.favorite = true;
        parks.push(park);
    });
    visitedParks?.map((park: any) => {
        park.visited = true;
        parks.push(park);
    });

    return parks;
}

export default async function NationalParksPage({params}: {params: Promise<{user: string}>}) {
    const userID = (await params).user;

    if (!userID) {
        console.log(userID);
        return <p>Uh, oh!</p>;
    }

    const userData = await getUserParksData(userID);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>My National Parks</h1>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                {userData && userData.length > 0 ? 
                    userData.map((park, index) => (
                        <ParkCard
                            parkCode={park.park_id}
                            favorite={park.favorite}
                            visited={park.visited}
                            key={`park-card-${park}-${index}`}
                        />
                    )) : (
                        <div className='min-h-screen min-w-screen'>
                            You haven&apos;t favorited or visited any parks!
                        </div>
                    )
                }
            </div>
        </div>
    );
}
