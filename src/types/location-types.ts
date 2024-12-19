import {Park} from '@/types/park-types';

export interface MarkerData {
    park: Park;
    location: google.maps.LatLngLiteral;
}
