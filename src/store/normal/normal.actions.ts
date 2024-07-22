import { NormalStoreStateModel } from './normal.interface';

const ACTION_SCOPE_USER = '[User]';

export namespace NormalActions {
  export class UserAddAction {
    static readonly type = `${ACTION_SCOPE_USER} 添加登录用户`;

    constructor(readonly normal: NormalStoreStateModel) {}
  }

  export class UserLogoutAction {
    static readonly type = `${ACTION_SCOPE_USER} 退出登录`;

    constructor() {}
  }
}
