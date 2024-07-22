import { environment } from '@env/environment';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { getActionTypeFromInstance, NgxsConfig } from '@ngxs/store';

import { NormalActions } from './normal/normal.actions';
import { NormalStoreState } from './normal/normal.state';

import UserLogoutAction = NormalActions.UserLogoutAction;

export const STATES_MODULES = [NormalStoreState];
export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  developmentMode: environment.production,
  ...withNgxsStoragePlugin({ keys: '*' })
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: environment.production
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: environment.production
};

export function logoutPlugin(state: any, action: any, next: any) {
  // Use the get action type helper to determine the type
  console.log(getActionTypeFromInstance(action));
  if (getActionTypeFromInstance(action) === UserLogoutAction.type) {
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}
