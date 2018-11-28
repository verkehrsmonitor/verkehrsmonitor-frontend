import { combineReducers } from 'redux';

import AppState from '~/modules/App/State';
import FilterBarState from '~/modules/FilterBar/State';

export default combineReducers({
  AppState,
  FilterBarState
});
