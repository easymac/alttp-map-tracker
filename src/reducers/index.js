import { combineReducers } from 'redux';
import itemTracker from './itemTrackerReducer';
import map from './mapReducer';
import {routerReducer} from 'react-router-redux';
import actionLogger from './actionLogger';

const rootReducer = combineReducers({
  itemTracker,
  map,
  actionLogger,
  routing: routerReducer
});

export default rootReducer;
