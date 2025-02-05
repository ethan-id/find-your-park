import {peopleAPISchema, PeopleAPIResponse, Person} from '@/types/people-types';
import Image from 'next/image';
import {toKebabCase} from '@/utils/string-utils';

async function fetchPeople(parkCode?: string): Promise<PeopleAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/people?api_key=${process.env.NPS_API_KEY}&parkCode=${parkCode ?? ''}`;
    const res = await fetch(url);
    const json = await res.json();
    return peopleAPISchema.parse(json);
}

export default async function Page({params}: {params: Promise<{park: string; person: string}>}) {
    const p = await params;
    const name = p.person;
    const park = p.park;

    const {data} = await fetchPeople(park);
    const person = data?.find((person: Person) => {
        return toKebabCase(person.images[0]?.title ?? '') === name;
    });

    if (!person) {
        return (
            <div className='flex justify-center items-center font-bold w-screen h-screen text-4xl'>
                We can&apos;t find this person&apos;s information 🙁
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4 max-w-7xl'>
            <div className='flex flex-col lg:flex-row gap-6 p-6'>
                <div className='lg:w-1/3'>
                    {person.images && person.images.length > 0 && (
                        <div className='relative'>
                            <Image
                                src={person.images[0].url || '/placeholder.svg'}
                                alt={person.images[0].altText as string}
                                className='w-full object-cover rounded-lg shadow-sm'
                                width={350}
                                height={500}
                            />
                            {person.images[0].caption && (
                                <p className='mt-2 text-sm text-gray-600 italic'>{person.images[0].caption}</p>
                            )}
                        </div>
                    )}
                </div>
                <div className='lg:w-2/3'>
                    <h1 className='text-4xl font-bold text-foreground mb-4'>{person.title}</h1>
                    <p className='text-lg text-foreground/90 mb-6'>{person.listingDescription}</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        {person.quickFacts.map((fact) => (
                            <div
                                key={fact.id}
                                className='border rounded-lg p-4'
                            >
                                <h3 className='font-semibold text-foreground mb-1'>{fact.name}</h3>
                                <p className='text-foreground/80'>{fact.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='px-6 pb-6'>
                <h2 className='text-2xl font-bold text-foreground mb-4'>Biography</h2>
                <div
                    dangerouslySetInnerHTML={{__html: person.bodyText}}
                    className='prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90'
                />
            </div>
        </div>
    );
}
