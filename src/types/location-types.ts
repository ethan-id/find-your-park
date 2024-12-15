import {Park} from '@/types/park-types';

export interface Poi {
    key: string;
    location: google.maps.LatLngLiteral;
}

export interface MarkerData {
    park: Park;
    location: google.maps.LatLngLiteral;
}
