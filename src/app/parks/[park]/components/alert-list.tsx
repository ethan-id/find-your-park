import {ParkAlert} from './park-alert';
import {AlertsAPIResponse, alertsAPISchema, type Alert} from '@/types/alert-types';
import type {FunctionComponent} from 'react';

async function fetchAlerts(parkCode: string): Promise<AlertsAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/alerts?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&parkCode=${parkCode}`;
    const res = await fetch(url);
    const json = await res.json();
    return alertsAPISchema.parse(json);
}

const filterAlerts = (alerts: Alert[]): Alert[] => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return alerts.filter((alert) => {
        const eventDate = new Date(alert.lastIndexedDate);
        return eventDate >= sevenDaysAgo;
    });
};

interface AlertListProps {
    parkCode: string;
}

// TODO: Figure out how to hide this if no alerts are visible (User closes them)
export const AlertList: FunctionComponent<AlertListProps> = async ({parkCode}) => {
    const {data} = await fetchAlerts(parkCode);

    const alerts = filterAlerts(data);
    
    console.log(alerts);

    return (
        alerts.length > 0 && (
            <ul className='flex flex-col gap-3 w-full max-w-6xl pb-3'>
                {alerts.map((alert, i) => (
                    <ParkAlert alert={alert} key={`${parkCode}-alert-${i}`} />
                ))}
            </ul>
        )
    );
};
