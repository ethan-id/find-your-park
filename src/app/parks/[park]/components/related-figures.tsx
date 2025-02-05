import {ImageRow} from './image-row';
import {FC} from 'react';
import {peopleAPISchema, PeopleAPIResponse} from '@/types/people-types';

async function fetchPeople(parkCode?: string): Promise<PeopleAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/people?api_key=${process.env.NPS_API_KEY}&parkCode=${parkCode ?? ''}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch people: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    try {
        return peopleAPISchema.parse(json);
    } catch (error) {
        console.error('Zod parse error in fetchPeople:', error);
        throw new Error('Invalid data from NPS People API');
    }
}

interface RelatedFiguresProps {
    parkCode: string;
}

export const RelatedFigures: FC<RelatedFiguresProps> = async ({parkCode}) => {
    const {data: people} = await fetchPeople(parkCode);

    return (
        people &&
        people.length > 0 && (
            <ImageRow
                images={people.map((person) => person.images[0])}
                title='Related Figures'
                isPeople
            />
        )
    );
};
