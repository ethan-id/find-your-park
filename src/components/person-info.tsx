'use client';

import {FC} from 'react';
import {Spinner} from '@nextui-org/react';
import {toKebabCase} from '@/utils/string-utils';
import {usePeople} from '@/hooks/use-people';

interface PersonInfoProps {
    parkCode: string;
    name: string;
}

export const PersonInfo: FC<PersonInfoProps> = ({parkCode, name}) => {
    const {people, error, loading} = usePeople(parkCode);

    if (loading) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>Couldn't find parks 🙁</div>;
    }

    const person = people?.find((person) => toKebabCase(person.title) === name);

    console.log(person);

    return <div>{person?.firstName}</div>;
};
