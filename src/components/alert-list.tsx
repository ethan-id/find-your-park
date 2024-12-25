import {FunctionComponent} from 'react';
import {useAlerts} from '@/hooks/use-alerts';
import {Alert} from '@/types/alert-types';
import {ParkAlert} from './park-alert';

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
export const AlertList: FunctionComponent<AlertListProps> = ({parkCode}) => {
    const {alerts} = useAlerts(parkCode, filterAlerts);

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
