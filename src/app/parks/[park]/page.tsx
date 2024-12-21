export default async function Page({params}: {params: Promise<{park: string}>}) {
    const park = (await params).park;

    return <div>My Park: {park}</div>;
}
