import objectAssign from 'object-assign';
import initialState from './initialState';

import { UPDATE_MAP_TYPE_ID } from '../constants/actionTypes';

export default function mapReducer(state = initialState.map, action) {
  switch (action.type) {
    case UPDATE_MAP_TYPE_ID: {
      const mapTypeId = action.id;
      return objectAssign({}, state, {mapTypeId});
    }
    default: {
      return state;
    }
  }
}
