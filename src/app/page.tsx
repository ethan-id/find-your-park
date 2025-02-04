import {MyMap} from '@/components/my-map';

export default async function HomePage() {
    return (
        <div className='flex flex-row justify-between align-center bg-[#05080d] w-screen h-screen'>
            <MyMap />
        </div>
    );
};
