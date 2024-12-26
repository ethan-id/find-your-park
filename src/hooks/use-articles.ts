'use client';

import {useState, useEffect} from 'react';
import {articleResponseSchema, ArticlesAPIResponse, Article} from '@/types/articles-types';

async function fetchArticles(): Promise<ArticlesAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/articles?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = articleResponseSchema.parse(json);
    return parsedData;
}

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchArticles()
            .then((response) => {
                setArticles(response?.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {articles, loading, error};
}
