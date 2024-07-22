import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { NormalStoreStateModel } from './normal.interface';

import UserAddAction = NormalActions.UserAddAction;

// eslint-disable-next-line import/order
import { NormalActions } from './normal.actions';

@State<NormalStoreStateModel>({
  name: 'normal',
  defaults: {
    user: null
  }
})
@Injectable()
export class NormalStoreState {
  @Selector()
  static getNormal(state: NormalStoreStateModel) {
    return state;
  }

  @Action(UserAddAction)
  addUser(ctx: StateContext<NormalStoreStateModel>, item: UserAddAction) {
    const state = ctx.getState();
    ctx.setState({ ...state, user: item.normal.user });
  }

  // @Action(NormalStoreAction)
  // delUser(ctx: StateContext<NormalStoreStateModel>, item: NormalStoreAction) {
  //   const state = ctx.getState();
  //   state.normal = null;
  //   ctx.setState(state);
  // }
}
