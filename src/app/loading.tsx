'use client';

import {Spinner} from '@heroui/react';

export default function Loading() {
    return (
        <div className='flex flex-col justify-center items-center text-bold w-[100vw] h-[100vh] text-4xl gap-6'>
            <p className='font-bold text-xl'>Loading...</p>
            <Spinner size={'lg'} />
        </div>
    );
}
