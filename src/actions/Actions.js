import store from '../store/Store';
import { Action } from './ActionType';
import {
  Services
} from '../services/Services';

export const loadConfig = () => Services.loadConfig().then(res => {
  if (res) {
    store.dispatch({
      type: Action.ACTION_LOAD_CONFIG_FINISH,
      data: res,
    });
  }
  return res;
});

export const getCustomers = () => Services.getCustomers().then(res => {
  // if (res) {
  //   store.dispatch({
  //     type: Action.ACTION_LOAD_CONFIG_FINISH,
  //     data: res,
  //   });
  // }
  return res;
});