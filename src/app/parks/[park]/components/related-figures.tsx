'use client';

import {usePeople} from '@/hooks/use-people';
import {ImageRow} from './image-row';
import { FC } from 'react';

interface RelatedFiguresProps {
    parkCode: string
}

export const RelatedFigures: FC<RelatedFiguresProps> = ({parkCode}) => {
    const {people} = usePeople(parkCode);

    return (
        people &&
        people.length > 0 && (
            <ImageRow
                images={people.map((person) => person.images[0])}
                title={'Related Figures'}
                isPeople
            />
        )
    );
};
