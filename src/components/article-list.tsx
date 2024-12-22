import {FunctionComponent, Suspense} from 'react';
import {useArticles} from '@/hooks/use-articles';
import {Skeleton} from '@nextui-org/react';
import SuspenseImage from '@/components/suspense-image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const ArticleList: FunctionComponent = () => {
    const {articles, loading, error} = useArticles();

    if (loading) {
        return <p>Loading articles...</p>;
    }

    if (error) {
        return <p>Uh oh! We couldn't fetch the articles ☹️</p>;
    }

    return (
        <ul>
            {articles?.map((article) => (
                <li key={`${article.id}${article.title}`} className={'gap-2 py-2'}>
                    {article.listingImage.url !== '' ? (
                        <div className='flex flex-row gap-4 justify-between max-h-56 snap-x snap-mandatory overflow-x-scroll'>
                            <Suspense fallback={<ImgFallback />}>
                                <SuspenseImage
                                    src={article.listingImage.url}
                                    alt={article.listingImage.altText ?? ''}
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
                    {article.listingDescription}
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
