import intialState from './initialState';
import { Action } from '../actions/ActionType';

export default function rootReducer(state = intialState, action) {
  switch (action.type) {
    case Action.ACTION_LOAD_CONFIG_FINISH:
      const container = {
        ...action.data.data
      };
      return { ...state, ...container };
    default:
      return state;
  }
}