'use client';

import Link from "next/link";

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center text-bold w-[100vw] h-[100vh]'>
            <p className='font-bold text-6xl'>Uh, oh! You broke something 🧐</p>
            <p className='font-semi text-xl mb-6'>Just kidding hehe, it was probably me</p>
            <Link className='text-sky-300' href='/'>This will take you back to the homepage</Link>
            <p className='text-sm'>(if you still want to stick around)</p>
        </div>
    );
}
