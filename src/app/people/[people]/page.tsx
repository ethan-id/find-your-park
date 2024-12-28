export default async function Page({params}: {params: Promise<{park: string}>}) {
    const parkCode = (await params).park;

    return `Person from ${parkCode}`;
}
