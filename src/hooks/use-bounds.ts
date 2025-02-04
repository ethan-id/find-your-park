// @ts-nocheck
import {BoundsAPIResponse, BoundsAPIResponseSchema} from '@/types/bounds-types';
import {useMap} from '@vis.gl/react-google-maps';
import {useState, useEffect} from 'react';

async function fetchBounds(parkCode: string): Promise<BoundsAPIResponse> {
    const res = await fetch(`/api/bounds/${parkCode}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch boundaries for ${parkCode}`);
    }

    const json = await res.json();
    return BoundsAPIResponseSchema.parse(json);
}

export function useBounds(parkCode: string) {
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
    const [which, setWhich] = useState<'polygon' | 'polyline'>('polygon');
    const [polygons, setPolygons] = useState<google.maps.LatLng[][]>([]);
    const [polylines, setPolylines] = useState<google.maps.LatLng[][]>([]);
    const map = useMap();

    useEffect(() => {
        fetchBounds(parkCode)
            .then((response) => {
                const geo = response?.features[0].geometry;

                if (geo.type === 'MultiPolygon') {
                    // handle [[[{lng, lat}]]]
                    setPolygons(
                        geo.coordinates.map((coordsArray) =>
                            coordsArray.map((arrOfLatLngs) =>
                                arrOfLatLngs.map(([lng, lat]: [number, number]) => new google.maps.LatLng({lat, lng}))
                            )
                        )
                    );
                } else if (geo.type === 'Polygon') {
                    setPolygons(
                        geo.coordinates.map((coords) =>
                            coords.map(([lng, lat]: [number, number]) => new google.maps.LatLng({lat, lng}))
                        )
                    );
                } else if (geo.type === 'MultiLineString') {
                    setWhich('polyline');
                    setPolylines(
                        geo.coordinates.map((coordsArray) =>
                            coordsArray.map(([lng, lat]: [number, number]) => new google.maps.LatLng({lat, lng}))
                        )
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [parkCode]);

    useEffect(() => {
        if (!map) return;

        const boundsBuilder = new google.maps.LatLngBounds();

        if (which === 'polyline' && polylines.length) {
            // polylines is an array of arrays of LatLng
            polylines.forEach((polyline) => {
                polyline.forEach((latLng) => {
                    boundsBuilder.extend(latLng);
                });
            });
        } else if (polygons.length) {
            // polygons is an array of polygons
            // each polygon is an array of rings
            // each ring is an array of LatLng
            polygons.forEach((polygon) => {
                polygon.forEach((ring) => {
                    ring.forEach((latLng) => {
                        boundsBuilder.extend(latLng);
                    });
                });
            });
        }

        if (!boundsBuilder.isEmpty()) {
            setBounds(boundsBuilder);
        }
    }, [map, polygons, polylines, which]);

    // Draw the shapes on the map
    useEffect(() => {
        if (!map) return;

        if (which === 'polyline') {
            polylines.forEach((polyline) => {
                const line = new google.maps.Polyline({
                    path: polyline,
                    geodesic: true,
                    strokeColor: '#11e087',
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });
                line.setMap(map);
            });
        } else {
            polygons.forEach((polygon) => {
                const polygonShape = new google.maps.Polygon({
                    paths: polygon,
                    strokeColor: '#11e087',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#11e087',
                    fillOpacity: 0.35
                });
                polygonShape.setMap(map);
            });
        }
    }, [map, polygons, polylines, which]);

    return {bounds};
}
