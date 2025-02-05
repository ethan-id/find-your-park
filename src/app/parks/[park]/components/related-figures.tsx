import {ImageRow} from './image-row';
import {FC} from 'react';
import {peopleAPISchema, PeopleAPIResponse, Person} from '@/types/people-types';

async function fetchPeople(parkCode?: string): Promise<PeopleAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/people?api_key=${process.env.NPS_API_KEY}&parkCode=${parkCode ?? ''}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            console.error(`Failed to fetch people: ${res.status} ${res.statusText}`);
            return {data: [] as Person[]} as PeopleAPIResponse;
        }

        const json = await res.json();

        try {
            return peopleAPISchema.parse(json);
        } catch (parseError) {
            console.error('Zod parse error in fetchPeople:', parseError);
            return {data: [] as Person[]} as PeopleAPIResponse;
        }
    } catch (fetchError) {
        console.error('Error fetching people:', fetchError);
        return {data: [] as Person[]} as PeopleAPIResponse;
    }
}

interface RelatedFiguresProps {
    parkCode: string;
}

export const RelatedFigures: FC<RelatedFiguresProps> = async ({parkCode}) => {
    const {data: people} = await fetchPeople(parkCode);

    return (
        people.length > 0 && (
            <ImageRow
                images={people.map((person) => person.images[0])}
                title='Related Figures'
                isPeople
            />
        )
    );
};
