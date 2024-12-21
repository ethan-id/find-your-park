import {ParkInfo} from '@/components/park-info';

export default async function Page({params}: {params: Promise<{park: string}>}) {
    const parkID = (await params).park;

    return <ParkInfo parkID={parkID} />;
}
