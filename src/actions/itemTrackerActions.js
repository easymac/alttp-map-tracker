import * as types from '../constants/actionTypes';

export function equipItem(item) {
  return function(dispatch) {
    return dispatch({
      type: types.EQUIP_ITEM,
      item,
    });
  };
}

export function upgradeItem(item) {
  return function(dispatch) {
    return dispatch({
      type: types.UPGRADE_ITEM,
      item,
    });
  };
}

export function downgradeItem(item) {
  return function(dispatch) {
    return dispatch({
      type: types.DOWNGRADE_ITEM,
      item,
    });
  };
}
