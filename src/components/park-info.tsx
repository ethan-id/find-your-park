'use client';

import {useParksContext} from '@/contexts/parks-context';
import {FunctionComponent} from 'react';

interface ParkInfoProps {
    parkID: string;
}

export const ParkInfo: FunctionComponent<ParkInfoProps> = ({parkID}) => {
    const {parks} = useParksContext();

    const park = parks?.find((park) => park.id === parkID);

    return (
        <div>
            <p>{park?.name}</p>
            <p>{park?.description}</p>
        </div>
    );
};
