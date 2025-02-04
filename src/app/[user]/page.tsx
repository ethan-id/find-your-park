import {supabase} from '@/lib/supabaseClient';
import {ParkCard, ParkCardSkeleton} from './components/park-card';
import {Suspense} from 'react';

interface UserPark {
    park_id: string;
    favorite?: boolean;
    visited?: boolean;
}

async function getUserParksData(userID: string) {
    const {data: visitedParks, error: visitedError} = await supabase
        .from('visited_parks')
        .select('park_id')
        .eq('user_id', userID);

    const {data: favoriteParks, error: favoriteError} = await supabase
        .from('favorite_parks')
        .select('park_id')
        .eq('user_id', userID);

    const parks = new Map<string, UserPark>();

    favoriteParks?.map(({park_id}: UserPark) => {
        parks.set(park_id, {
            park_id,
            favorite: true
        });
    });
    visitedParks?.map(({park_id}: UserPark) => {
        if (!parks.has(park_id)) {
            parks.set(park_id, {
                park_id,
                visited: true
            });
        } else {
            parks.set(park_id, {
                ...(parks.get(park_id) as UserPark),
                visited: true
            });
        }
    });

    return [...parks.values()];
}

export default async function NationalParksPage({params}: {params: Promise<{user: string}>}) {
    const userID = (await params).user;

    if (!userID) {
        console.error(userID);
        return <p>Uh, oh!</p>;
    }

    const userData: UserPark[] = await getUserParksData(userID);

    return (
        <div className='container mx-auto px-4 py-8 min-h-screen'>
            <h1 className='text-3xl font-bold mb-8'>My National Parks</h1>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                {userData && userData.length > 0 ? (
                    userData.map((park) => (
                        <Suspense 
                            fallback={<ParkCardSkeleton key={`park-card-${park.park_id}-skeleton`} />}
                            key={`park-card-${park.park_id}-suspense`}
                        >
                            <ParkCard
                                parkCode={park.park_id}
                                favorite={park.favorite}
                                visited={park.visited}
                                key={`park-card-${park.park_id}`}
                            />
                        </Suspense>
                    ))
                ) : (
                    <div className='min-h-screen min-w-screen'>You haven&apos;t favorited or visited any parks!</div>
                )}
            </div>
        </div>
    );
}
