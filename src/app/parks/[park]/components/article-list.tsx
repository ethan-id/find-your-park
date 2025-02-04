'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Card, CardBody, CardHeader, Skeleton} from "@heroui/react";
import {Suspense} from 'react';
import {SuspenseImage} from '@/components/suspense-image';
import {useArticles} from '@/hooks/use-articles';
import type {FunctionComponent} from 'react';

interface ArticleListProps {
    parkCode?: string;
}

// TODO: Re-use this in park-info.tsx
export const ArticleList: FunctionComponent<ArticleListProps> = ({parkCode}) => {
    const {articles, loading, error} = useArticles(parkCode);

    if (loading) {
        return (
            <div className='flex flex-col gap-12'>
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
            </div>
        );
    }

    if (error) {
        return <p>Uh oh! We couldn&apos;t fetch the articles ☹️</p>;
    }

    return (
        <ul>
            {articles?.map((article) => (
                <li
                    key={`${article.id}${article.title}`}
                    className={'gap-2 py-2'}
                >
                    <Card
                        className='min-w-96 bg-[#18181b] p-4'
                        radius='lg'
                    >
                        <CardHeader className='flex flex-col gap-3'>
                            {article.listingImage.url !== '' ? (
                                <div className='flex flex-row gap-4 justify-between max-h-56 snap-x snap-mandatory overflow-x-scroll'>
                                    <Suspense fallback={<ImgFallback />}>
                                        <SuspenseImage
                                            src={article.listingImage.url}
                                            alt={article.listingImage.altText ?? ''}
                                            className='rounded-lg object-cover'
                                        />
                                    </Suspense>
                                </div>
                            ) : null}

                            <a
                                className='flex flex-row justify-between items-center text-xl font-semibold py-2'
                                target='_blank'
                                href={article.url}
                            >
                                {' '}
                                {article.title}
                                <OpenInNewIcon />
                            </a>
                        </CardHeader>
                        <CardBody>{article.listingDescription}</CardBody>
                    </Card>
                </li>
            ))}
        </ul>
    );
};

const ImgFallback = () => {
    return (
        <Skeleton className='min-w-full rounded-lg'>
            <div className='min-h-52' />
        </Skeleton>
    );
};

const SkeletonArticle = () => {
    return (
        <Card
            className='min-w-96 space-y-5 p-4'
            radius='lg'
        >
            <Skeleton className='rounded-lg'>
                <div className='h-24 rounded-lg bg-default-300' />
            </Skeleton>
            <div className='space-y-3'>
                <Skeleton className='w-3/5 rounded-lg'>
                    <div className='h-3 w-3/5 rounded-lg bg-default-200' />
                </Skeleton>
                <Skeleton className='w-4/5 rounded-lg'>
                    <div className='h-3 w-4/5 rounded-lg bg-default-200' />
                </Skeleton>
                <Skeleton className='w-2/5 rounded-lg'>
                    <div className='h-3 w-2/5 rounded-lg bg-default-300' />
                </Skeleton>
            </div>
        </Card>
    );
};
