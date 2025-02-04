import {PersonInfo} from './components/person-info';

export default async function Page({params}: {params: Promise<{park: string; person: string}>}) {
    const p = await params;
    const park = p.park;
    const person = p.person;

    return (
        <PersonInfo
            parkCode={park}
            name={person}
        />
    );
}
