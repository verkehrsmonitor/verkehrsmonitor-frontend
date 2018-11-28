import moment from 'moment';

import * as AppActions from '../App/State';

const SET_ACTIVE_STATE = 'Filter/FilterBarState/SET_ACTIVE_STATE';
const SET_ACTIVE_STATION = 'Filter/FilterBarState/SET_ACTIVE_STATION';
const SET_ACTIVE_ROAD = 'Filter/FilterBarState/SET_ACTIVE_ROAD';
const SET_RANGE_TYPE = 'Filter/FilterBarState/SET_RANGE_TYPE';
const SET_TIME_RANGE = 'Filter/FilterBarState/SET_TIME_RANGE';
const SET_ROAD_TYPE = 'Filter/FilterBarState/SET_ROAD_TYPE';

const RESET_FILTER = 'Filter/FilterBarState/RESET_FILTER';

function getTimeRangeForType(type = 'day') {
  const defaultValues = config.filter.timeRange[type];
  return [moment(defaultValues[0], 'YYYY-MM-DD'), moment(defaultValues[1], 'YYYY-MM-DD')];
}

const initialState = {
  activeState: null,
  activeStation: null,
  activeRoad: null,
  timeRangeMinMax: getTimeRangeForType('minMax'),
  timeRange: getTimeRangeForType(),
  roadType: 'A',
  rangeType: 'day'
};

export function resetFilter() {
  return (dispatch) => {
    dispatch(AppActions.resetRoadGeoData());
    dispatch({
      type: RESET_FILTER,
      payload: {
        activeState: null,
        activeRoad: null,
        activeStation: null
      }
    });
  };
}

export function setTimeRange(timeRange) {
  return (dispatch) => {
    dispatch({ type: SET_TIME_RANGE, payload: { timeRange } });
    dispatch(AppActions.loadInTimeRange());
  };
}

export function setActiveStation(activeStation) {
  return async (dispatch) => {
    dispatch(resetFilter());
    dispatch({ type: SET_ACTIVE_STATION, payload: { activeStation } });
  };
}

export function setRoadType(roadType) {
  return (dispatch) => {
    dispatch(resetFilter());
    dispatch({ type: SET_ROAD_TYPE, payload: { roadType } });
    dispatch(AppActions.loadInTimeRange());
  };
}

export function setActiveState(activeState) {
  return (dispatch) => {
    dispatch(resetFilter());
    dispatch({ type: SET_ACTIVE_STATE, payload: { activeState } });
  };
}

export function setActiveRoad(activeRoad) {
  return (dispatch) => {
    dispatch(resetFilter());
    if (activeRoad) {
      dispatch(AppActions.loadRoadGeoData(activeRoad));
    }

    dispatch({ type: SET_ACTIVE_ROAD, payload: { activeRoad } });
  };
}

export function setRangeType(rangeType) {
  return (dispatch) => {
    dispatch({ type: SET_RANGE_TYPE, payload: { rangeType } });

    const timeRange = getTimeRangeForType(rangeType);
    dispatch(setTimeRange(timeRange));
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_FILTER:
    case SET_ACTIVE_ROAD:
    case SET_ACTIVE_STATE:
    case SET_ACTIVE_STATION:
    case SET_RANGE_TYPE:
    case SET_ROAD_TYPE:
    case SET_TIME_RANGE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
}
