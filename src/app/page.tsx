import {MyMap} from '@/components/my-map';
import type {FunctionComponent} from 'react';

const Home: FunctionComponent = () => {
    return (
        <div className='flex flex-row justify-between align-center bg-[#05080d] w-screen h-screen'>
            <MyMap />
        </div>
    );
};

export default Home;
