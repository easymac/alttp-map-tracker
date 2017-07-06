import objectAssign from 'object-assign';
import initialState from './initialState';

import { EQUIP_ITEM, UPGRADE_ITEM, DOWNGRADE_ITEM } from '../constants/actionTypes';

export default function itemTrackerReducer(state = initialState.tracker, action) {
  switch (action.type) {
    case EQUIP_ITEM: {
      const items = [...state.items];
      const i = items.findIndex(item => item.id === action.item.id);
      const newItem = objectAssign({}, action.item, {equipped: !action.item.equipped});
      items[i] = newItem;
      return objectAssign({}, state, {items});
    }
    case UPGRADE_ITEM: {
      const items = [...state.upgradeables];
      const i = items.findIndex(item => item.id === action.item.id);
      const item = items[i];
      let value = item.value + 1;
      if (value > item.names.length) {
        value = (item.mandatory) ? 1 : 0;
      }
      const newItem = objectAssign({}, action.item, {value});
      items[i] = newItem;
      return objectAssign({}, state, {upgradeables: items});
    }
    case DOWNGRADE_ITEM: {
      const items = [...state.upgradeables];
      const i = items.findIndex(item => item.id === action.item.id);
      const item = items[i];
      let value = item.value - 1;
      if (item.mandatory) {
        value = (value < 1) ? item.names.length : value;
      } else {
        value = (value < 0) ? item.names.length : value;
      }
      const newItem = objectAssign({}, action.item, {value});
      items[i] = newItem;
      return objectAssign({}, state, {upgradeables: items});
    }
    default: {
      return state;
    }
  }
}
