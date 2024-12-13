import {FunctionComponent} from 'react';

export const ParksList: FunctionComponent = () => {
    const parks = [
        'Yellowstone',
        'BadLands',
        'Smoky Mountains',
        'Appalachian Mountains'
    ];

    return (
        <ul>
            {parks.map((park) => (
                <li key={park}>{park}</li>
            ))}
        </ul>
    );
};
