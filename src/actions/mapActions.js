import * as types from '../constants/actionTypes';

export function openLoot(loot) {
  return function(dispatch) {
    return dispatch({
      type: types.OPEN_LOOT,
      loot,
    });
  };
}

export function closeLoot(loot) {
  return function(dispatch) {
    return dispatch({
      type: types.CLOSE_LOOT,
      loot,
    });
  };
}

export function updateMapTypeId(id) {
  return function(dispatch) {
    return dispatch({
      type: types.UPDATE_MAP_TYPE_ID,
      id,
    });
  };
}
