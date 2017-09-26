
import initialState from './initialState';

export default function actionLogger(state = initialState, action) {
  console.log(action); // eslint-disable-line
  return state;
}
