'use client';

import {FC, useEffect, useState} from 'react';
import {Checkbox, Tooltip} from '@heroui/react';
import {useUser} from '@clerk/nextjs';
import {supabase} from '@/lib/supabaseClient';

const useVisited = (parkCode: string) => {
    const {user} = useUser();
    const [visited, setVisited] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchInitialRow = async () => {
            const {data} = await supabase
                .from('visited_parks')
                .select('*')
                .match({user_id: user?.id, park_id: parkCode});

            if (data?.length && data?.length > 0) setVisited(true);
        };

        fetchInitialRow().finally(() => setLoading(false));
    }, []);

    return {visited, setVisited, loading};
};

interface VisitedCheckboxProps {
    parkCode: string;
}

export const VisitedCheckbox: FC<VisitedCheckboxProps> = ({parkCode}) => {
    const {user, isSignedIn} = useUser();

    const {visited, setVisited, loading} = useVisited(parkCode);

    const handleValueChange = async () => {
        const newVis = !visited;
        setVisited(newVis);

        if (newVis) {
            const {data, error} = await supabase
                .from('visited_parks')
                .insert({user_id: user?.id, park_id: parkCode})
                .select();

            if (error) {
                setVisited((val) => !val);
                // alert user of error
                console.error(error);
            } else {
                console.log('Updated visited parks:', data);
            }
        } else {
            const {data, error} = await supabase
                .from('visited_parks')
                .delete()
                .eq('park_id', parkCode)
                .eq('user_id', user?.id)
                .select();

            if (error) {
                setVisited((val) => !val);
                // alert user of error
                console.error(error);
            } else {
                console.log('Deleted visited info', data);
            }
        }
    };

    return isSignedIn ? (
        <Checkbox
            disabled={loading}
            isSelected={visited}
            onValueChange={() => handleValueChange()}
        >
            Visited
        </Checkbox>
    ) : (
        <Tooltip
            content='You must sign in'
            color='danger'
            showArrow
            placement='right'
        >
            <Checkbox
                disabled
                isSelected={false}
            >
                <p>Visited</p>
            </Checkbox>
        </Tooltip>
    );
};
