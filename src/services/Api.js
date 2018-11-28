import Axios from 'axios';
import { parseRangeData, parseStations } from '~/helper/data-converter';

export function fetchStations(params) {
  return Axios.get(`${config.api.serverUrl}${config.api.baseUrl}${config.api.stationsPath}`, {
    params
  })
    .then(parseStations)
    .catch((err) => { throw err; });
}

export function fetchInTimeRange(params) {
  return Axios.get(`${config.api.serverUrl}${config.api.baseUrl}${config.api.rangePath}`, {
    params
  })
    .then(parseRangeData)
    .catch((err) => { throw err; });
}


export function fetchRoadGeoData(id) {
  return Axios.get(`${config.api.roadGeoPath}/${id}.json`)
    .then(res => res.data)
    .catch((err) => { throw err; });
}

export function fetchStatesGeoData() {
  return Axios.get(config.api.statesGeoPath)
    .then(res => res.data)
    .catch((err) => { throw err; });
}

export default {
  fetchStations,
  fetchInTimeRange,
  fetchRoadGeoData,
  fetchStatesGeoData
};
