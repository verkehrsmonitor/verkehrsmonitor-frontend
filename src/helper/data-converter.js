import { dsvFormat as d3DsvFormat } from 'd3-dsv';
import { isDefined } from './utils';

function getValidatedValue(a, b) {
  const left = a > 0 ? a : 0;
  const right = b > 0 ? b : 0;
  return left + right;
}

export function parseData(res) {
  const ssv = d3DsvFormat(',');
  return ssv.parse(res.data);
}

export function parseRangeData(res) {
  return {
    data: parseData(res)
      .map(d => ({
        date: d.date,
        nr: d.nr,
        total: getValidatedValue(+d.total_1 + +d.total_2),
        truck: getValidatedValue(+d.truck_1 + +d.truck_2),
        car: getValidatedValue(+d.car_1 + +d.car_2),
        bus: getValidatedValue(+d.bus_1, +d.bus_2)
      })),
    timeRangeUnit: res.headers['x-timerange']
  };
}


export function parseStations(res) {
  return parseData(res)
    .map(d => ({
      ...d,
      lat: +d.lat,
      lng: +d.lng,
      road: `${d.type}${d.roadid}`
    }));
}

export function parseStatesFromGeoData(geojson) {
  if (!isDefined(geojson)) return [];
  return geojson.features.map(feature =>
    ({ key: feature.properties.ID, label: feature.properties.NAME }));
}

export default {
  parseData,
  parseStations,
  parseStatesFromGeoData
};
