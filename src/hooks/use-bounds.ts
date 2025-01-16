// @ts-nocheck
// TODO: Fix the TS errors in this file so you don't need this

import {BoundsAPIResponse, BoundsAPIResponseSchema} from '@/types/bounds-types';
import {useMap} from '@vis.gl/react-google-maps';
import {useState, useEffect} from 'react';

async function fetchBounds(parkCode: string): Promise<BoundsAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/mapdata/parkboundaries/${parkCode}?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    return BoundsAPIResponseSchema.parse(json);
}

// TODO: Add return type to all hooks!
export function useBounds(parkCode: string) {
    const [which, setWhich] = useState<'polygon' | 'polyline'>('polygon');
    const [polygons, setPolygons] = useState<google.maps.LatLng[][]>([]);
    const [polylines, setPolylines] = useState<google.maps.LatLng[][]>([]);
    const map = useMap();

    useEffect(() => {
        fetchBounds(parkCode)
            .then((response) => {
                const geo = response?.features[0].geometry;

                // TODO: Fix TS Errors
                if (geo.type === 'MultiPolygon') {
                    // handle [[[{lng, lat}]]]
                    setPolygons(
                        geo.coordinates.map((coordsArray) =>
                            coordsArray.map((arrOfLatLngs) =>
                                arrOfLatLngs.map(
                                    ([lng, lat]: [number, number]) =>
                                        new google.maps.LatLng({
                                            lat,
                                            lng
                                        })
                                )
                            )
                        )
                    );
                } else if (geo.type === 'Polygon') {
                    setPolygons(
                        geo.coordinates.map((coords) =>
                            coords.map(
                                ([lng, lat]: [number, number]) =>
                                    new google.maps.LatLng({
                                        lat,
                                        lng
                                    })
                            )
                        )
                    );
                } else if (geo.type === 'MultiLineString') {
                    // handle [[{lng, lat}]]
                    setWhich('polyline');
                    setPolylines(
                        geo.coordinates.map((coordsArray) =>
                            coordsArray.map(
                                ([lng, lat]: [number, number]) =>
                                    new google.maps.LatLng({
                                        lat,
                                        lng
                                    })
                            )
                        )
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (!map) return;

        if (which === 'polyline') {
            polylines.map((polyline) => {
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
            polygons.map((polygon) => {
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
    }, [map, polygons, polylines]);
}
