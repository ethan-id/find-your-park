'use client';

import {FunctionComponent} from 'react';
import {MyMap} from '@/components/my-map';
import {ArticleList} from '@/components/article-list';

// TODO: Figure out if more of this can be SSR'd
const Home: FunctionComponent = () => {
    return (
        <div className='flex flex-row justify-between align-center bg-[#05080d] w-screen h-screen'>
            <div className='flex flex-col px-12 py-8'>
                <p className='text-3xl font-bold pb-4 flex-none'>Articles</p>
                <div className='overflow-auto flex-grow'>
                    <ArticleList />
                </div>
            </div>

            <MyMap />
        </div>
    );
};

export default Home;
