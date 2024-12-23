import {Spinner} from '@nextui-org/react';

export default function Loading() {
    return (
        <div className='flex justify-center items-center text-bold w-[100vw] h-[100vh] text-4xl'>
            <Spinner />
        </div>
    );
}
