import {useState} from 'react';
import {Alert} from '@/types/alert-types';
import {Alert as AlertComponent} from '@nextui-org/react';
import type {FunctionComponent} from 'react';

interface ParkAlertProps {
    alert: Alert;
}

export const ParkAlert: FunctionComponent<ParkAlertProps> = ({alert}) => {
    const [alertVisible, setAlertVisible] = useState(true);

    return (
        <li>
            <AlertComponent
                isVisible={alertVisible}
                color='warning'
                title={new Date(alert.lastIndexedDate).toLocaleString()}
                description={alert.description}
                onClose={() => setAlertVisible(false)}
            />
        </li>
    );
};
