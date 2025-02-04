'use client';

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center text-bold w-[100vw] h-[100vh] gap-4'>
            <div className='flex gap-3'>
                <p className='font-bold text-6xl text-red-500'>Uh, oh!</p>
                <p className='font-bold text-6xl'>You broke something 🧐</p>
            </div>
            <p className='font-semi text-xl mb-6'>Just kidding hehe, it was probably me</p>
        </div>
    );
}
