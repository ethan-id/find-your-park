import {ParkInfo} from '@/components/park-info';

export default async function Page({params}: {params: Promise<{park: string}>}) {
    const parkCode = (await params).park;

    return <ParkInfo parkCode={parkCode} />;
}
