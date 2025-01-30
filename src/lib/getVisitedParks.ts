import {supabase} from './supabaseClient';

export async function getVisitedParks(user_id: string) {
    const {data, error} = await supabase
        .from('visited_parks')
        .select('*')
        .eq('user_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

