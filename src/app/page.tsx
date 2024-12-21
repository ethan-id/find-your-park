'use client';

import {FunctionComponent} from 'react';
import {useApiIsLoaded} from '@vis.gl/react-google-maps';
import {MyMap} from '@/components/my-map';
import {useGeolocation} from '@uidotdev/usehooks';
import {ArticleList} from '@/components/article-list';
import {useReverseGeocode} from '@/hooks/use-reverse-geocode';
import {useParks} from '@/hooks/use-parks';
import {Spinner} from '@nextui-org/spinner';
import {useMarkers} from '@/hooks/use-markers';
import {useArticles} from '@/hooks/use-articles';

// TODO: Figure out if more of this can be SSR'd
const Home: FunctionComponent = () => {
    const mapsLoaded = useApiIsLoaded();
    const {error: geoError, loading: geoLoading, latitude, longitude} = useGeolocation();

    if (geoError) {
        return <div className='flex m-24 justify-center text-3xl'>Please give me permissions 😔</div>;
    }

    const {
        result,
        error: geoCodeError,
        loading: geoCodeLoading
    } = useReverseGeocode({
        latitude: typeof latitude === 'number' ? latitude : undefined,
        longitude: typeof longitude === 'number' ? longitude : undefined,
        mapsLoaded
    });
    const loading = geoLoading || geoCodeLoading;
    const stateCode = result?.stateCode ?? '';
    const {parks, loading: parksLoading} = useParks(stateCode);
    const {articles, loading: articlesLoading, error: articlesErr} = useArticles();

    const {parkMarkers} = useMarkers(parks, parksLoading);

    return (
        <div className='flex flex-row justify-center align-center bg-[#05080d] w-screen h-screen'>
            {!loading ? (
                <>
                    <div className='flex flex-col px-12 py-8'>
                        {geoCodeError && <p className='text-red-500'>Error: {geoCodeError.message}</p>}
                        <p className='text-3xl font-bold pb-4 flex-none'>Articles</p>
                        <div className='overflow-auto flex-grow'>
                            <ArticleList articles={articles} loading={articlesLoading} error={articlesErr} />
                        </div>
                    </div>

                    {typeof longitude === 'number' && typeof latitude === 'number' && (
                        <MyMap parkMarkers={parkMarkers} longitude={longitude} latitude={latitude} />
                    )}
                </>
            ) : (
                <div className='flex justify-center items-center text-bold w-[100vw] h-[100vh] text-4xl'>
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default Home;
