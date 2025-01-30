'use server';

import {supabase} from './supabaseClient';
// import {revalidatePath} from 'next/cache';

export async function addVisitedPark(user_id: string, park_id: string, notes?: string) {
    const {data, error} = await supabase
        .from('visited_parks')
        .insert([{user_id, park_id, notes}]);

    if (error) {
        throw new Error(error.message);
    }

    // revalidatePath('/dashboard'); // Refresh data on the dashboard
    //
    return data;
}
