import * as Api from '~/services/Api';
import { formatDate } from '~/helper/utils';

const LOAD_ERROR = 'App/AppState/LOAD_ERROR';

const FETCH_ROAD_GEO_DATA = 'App/AppState/FETCH_ROAD_GEO_DATA';
const FETCH_ROAD_GEO_DATA_SUCCESS = 'App/AppState/FETCH_ROAD_GEO_DATA_SUCCESS';
const RESET_ROAD_GEO_DATA = 'App/AppState/RESET_ROAD_GEO_DATA';

const FETCH_STATES_GEO_DATA = 'App/AppState/FETCH_STATES_GEO_DATA';
const FETCH_STATES_GEO_DATA_SUCCESS = 'App/AppState/FETCH_STATES_GEO_DATA_SUCCESS';

const FETCH_STATION_DATA = 'App/AppState/FETCH_STATION_DATA';
const FETCH_STATION_DATA_SUCCESS = 'App/AppState/FETCH_STATION_DATA_SUCCESS';

const FETCH_TIME_RANGE_DATA = 'App/AppState/FETCH_TIME_RANGE_DATA';
const FETCH_TIME_RANGE_DATA_SUCCESS = 'App/AppState/FETCH_TIME_RANGE_DATA_SUCCESS';

const SET_MAP_BOUNDS = 'App/AppState/SET_MAP_BOUNDS';
const SET_HIGHLIGHTED_STATION = 'App/AppState/SET_HIGHLIGHTED_STATION';

const initialState = {
  dataKeys: config.api.dataKeys,
  highlightedStation: null,
  isLoading: true,
  mapBounds: config.map.mapBounds,
  roadGeoData: null,
  statesGeoData: null,
  stationsData: [],
  timeRangeData: [],
  timeRangeUnit: null
};
// serverside filter
function getFieldsFromFilterState(keys) {
  return JSON.stringify(keys.concat(['nr', 'date']));
}

export function loadStations() {
  return async (dispatch) => {
    dispatch({ type: FETCH_STATION_DATA });
    try {
      const stationsData = await Api.fetchStations();

      dispatch({
        type: FETCH_STATION_DATA_SUCCESS,
        payload: { stationsData }
      });
    } catch (err) {
      dispatch({ type: LOAD_ERROR });
    }
  };
}

export function loadInTimeRange() {
  return async (dispatch, getState) => {
    const { AppState, FilterBarState } = getState();
    const { dataKeys } = AppState;
    const { timeRange, roadType: type } = FilterBarState;
    const fromDate = formatDate(timeRange[0]);
    const toDate = formatDate(timeRange[1]);

    const fields = getFieldsFromFilterState(dataKeys);

    const params = {
      fromDate,
      toDate,
      type,
      fields
    };

    dispatch({ type: FETCH_TIME_RANGE_DATA, payload: { isLoading: true } });
    try {
      const { data: timeRangeData, timeRangeUnit } = await Api.fetchInTimeRange(params);

      dispatch({
        type: FETCH_TIME_RANGE_DATA_SUCCESS,
        payload: { timeRangeData, timeRangeUnit, isLoading: false }
      });
    } catch (err) {
      dispatch({ type: LOAD_ERROR });
    }
  };
}

export function resetRoadGeoData() {
  return { type: RESET_ROAD_GEO_DATA, payload: { roadGeoData: null } };
}

export function loadRoadGeoData(roadId) {
  return async (dispatch, getState) => {
    const { roadType } = getState().FilterBarState;
    const id = `${roadType}${roadId}`;

    dispatch(resetRoadGeoData());
    dispatch({ type: FETCH_ROAD_GEO_DATA });
    try {
      const roadGeoData = await Api.fetchRoadGeoData(id);

      dispatch({
        type: FETCH_ROAD_GEO_DATA_SUCCESS,
        payload: { roadGeoData, isLoading: false }
      });
    } catch (err) {
      dispatch({ type: LOAD_ERROR });
    }
  };
}

export function loadStatesGeoData() {
  return async (dispatch) => {
    dispatch({ type: FETCH_STATES_GEO_DATA });
    try {
      const statesGeoData = await Api.fetchStatesGeoData();

      dispatch({
        type: FETCH_STATES_GEO_DATA_SUCCESS,
        payload: { statesGeoData }
      });
    } catch (err) {
      dispatch({ type: LOAD_ERROR });
    }
  };
}

export function setMapBounds(latLngBounds) {
  const mapBounds = [
    [latLngBounds.getSouthWest().lat, latLngBounds.getSouthWest().lng],
    [latLngBounds.getNorthEast().lat, latLngBounds.getNorthEast().lng]
  ];
  return { type: SET_MAP_BOUNDS, payload: { mapBounds } };
}

export function setHighlightedStation(highlightedStation) {
  return { type: SET_HIGHLIGHTED_STATION, payload: { highlightedStation } };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ROAD_GEO_DATA_SUCCESS:
    case FETCH_STATES_GEO_DATA_SUCCESS:
    case FETCH_STATION_DATA_SUCCESS:
    case FETCH_TIME_RANGE_DATA:
    case FETCH_TIME_RANGE_DATA_SUCCESS:
    case RESET_ROAD_GEO_DATA:
    case SET_HIGHLIGHTED_STATION:
    case SET_MAP_BOUNDS:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
}
