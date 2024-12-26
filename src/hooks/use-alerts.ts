'use client';

import {Alert, AlertsAPIResponse, alertsAPISchema} from '@/types/alert-types';
import {useState, useEffect} from 'react';

async function fetchAlerts(parkCode: string): Promise<AlertsAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/alerts?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode}`;
    const res = await fetch(url);
    const json = await res.json();
    return alertsAPISchema.parse(json);
}

// TODO: Add return type to all hooks!
export function useAlerts(parkCode: string, filter?: (alerts: Alert[]) => Alert[]) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchAlerts(parkCode)
            .then((response) => {
                setAlerts(response?.data);
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

    if (filter) {
        const filteredAlerts = filter(alerts);
        return {alerts: filteredAlerts, loading, error};
    }

    return {alerts, loading, error};
}
