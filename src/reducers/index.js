import { combineReducers } from 'redux';
import itemTracker from './itemTrackerReducer';
import map from './mapReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  itemTracker,
  map,
  routing: routerReducer
});

export default rootReducer;
