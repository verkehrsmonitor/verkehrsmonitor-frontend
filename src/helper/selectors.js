import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import { nest as d3Nest } from 'd3-collection';
import { compareStr, pointInRange } from './utils';
import { parseStatesFromGeoData } from './data-converter';

const sumReduce = (arr, key) => arr.reduce((sum, entry) => (sum + entry[key]), 0);

// Selectors
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const getTimeRangeData = state => state.AppState.timeRangeData;
const getStationsData = state => state.AppState.stationsData;
const getStatesGeoData = state => state.AppState.statesGeoData;

const getActiveRoad = state => state.FilterBarState.activeRoad;
const getActiveState = state => state.FilterBarState.activeState;
const getActiveStation = state => state.FilterBarState.activeStation;

const getRoadType = state => state.FilterBarState.roadType;
const getMapBounds = state => state.AppState.mapBounds;

export const getFilteredStations = createDeepEqualSelector(
  [
    getRoadType,
    getStationsData,
    getTimeRangeData,
    getMapBounds,
    getActiveRoad,
    getActiveState,
    getActiveStation
  ],
  (roadType, stations, timeRangeData, bounds, activeRoad, activeState, activeStation) => {
    const isVisible = entry =>
      (entry.type === roadType) &&
      (timeRangeData.some(d => entry.nr === d.nr)) &&
      (!activeStation || entry.nr === activeStation) &&
      (!activeState || entry.land === activeState) &&
      (!activeRoad || entry.roadid === activeRoad) &&
      (activeState || activeRoad || activeStation || pointInRange(entry, bounds));

    return stations.filter(station => isVisible(station));
  }
);

export const getDataForFilteredStations = createDeepEqualSelector(
  [getTimeRangeData, getFilteredStations],
  (data, stations) =>
    data.filter(entry => stations.find(station => station.nr === entry.nr))
);

export const getStats = createDeepEqualSelector(
  [getDataForFilteredStations],
  (filterData) => {
    const keys = ['bus', 'truck', 'total'];
    // per station
    const stations = d3Nest()
      .key(d => d.nr)
      .rollup(values => keys.reduce((res, key) => {
        res[key] = sumReduce(values, key);
        return res;
      }, {}))
      .entries(filterData);

    // all stations
    const stats = stations.reduce((res, entry) => {
      res.total += entry.value.total;
      res.truck += entry.value.truck;
      res.bus += entry.value.bus;
      return res;
    }, { total: 0, truck: 0, bus: 0 });

    return {
      stations,
      ...stats
    };
  }
);

export const getTotalValuesForTypeInRange = createDeepEqualSelector(
  getDataForFilteredStations,
  (filterData) => {
    const keys = ['bus', 'truck', 'car'];
    const byDate = d3Nest()
      .key(d => d.date)
      .rollup(values => keys.reduce((res, key) => {
        res[key] = sumReduce(values, key);
        return res;
      }, {}))
      .entries(filterData);

    return keys.map((key, index) =>
      ({
        id: key,
        ttLabel: 'Typ',
        ttDataLabel: 'Messungen',
        color: config.colors.charts[index],
        data: byDate.map(entry => ({ date: entry.key, value: entry.value[key] }))
      })
    );
  }
);

export const getTableData = createDeepEqualSelector(
  [getStats, getStationsData],
  (data, stations) =>
    data.stations.map((entry) => {
      const station = stations.find(s => s.nr === entry.key);
      const res = ({
        key: entry.key,
        land: station.land,
        name: station.name,
        nr: station.nr,
        road: station.road,
        stateLabel: config.states[station.land],
        total: entry.value.total,
        bus: entry.value.bus,
        truck: entry.value.truck
      });
      return res;
    })
);

export const getRoads = createDeepEqualSelector(
  [getStationsData, getRoadType],
  (stations, roadType) => {
    const filteredByType = stations.filter(station => station.type === roadType);
    return filteredByType.reduce((res, station) => {
      if (res.find(entry => entry.label === station.road)) {
        return res;
      }
      return res.concat({
        key: station.roadid,
        label: station.road
      });
    }, [])
      .sort((a, b) => compareStr(a.key, b.key));
  }
);

export const getStates = createDeepEqualSelector(
  getStatesGeoData,
  data =>
    parseStatesFromGeoData(data).sort((a, b) => compareStr(a.key, b.key))

);

export default {
  getStats,
  getFilteredStations,
  getRoads,
  getTotalValuesForTypeInRange,
  getTableData,
  getStates
};
