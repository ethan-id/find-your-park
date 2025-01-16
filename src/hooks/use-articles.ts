import {useState, useEffect} from 'react';
import {articleResponseSchema, ArticlesAPIResponse, Article} from '@/types/articles-types';

async function fetchArticles(parkCode?: string): Promise<ArticlesAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/articles?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode ?? ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = articleResponseSchema.parse(json);
    return parsedData;
}

export function useArticles(parkCode?: string) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchArticles(parkCode)
            .then((response) => {
                setArticles(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return {articles, loading, error};
}
