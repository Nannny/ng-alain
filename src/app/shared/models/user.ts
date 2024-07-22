export type User = {
  token: string;
  tokenType: string;
  refreshToken?: string;
  name: string;
  account: string;
  avatarId?: any;
  workDescribe?: any;
  userId: string;
  expire?: string;
  expiration?: string;
  expireMillis?: string;
  deptName: string;
  deptId: string;
  unitName: string;
  unitId: string;
  whoAmI: number;
  tel?: any;
  extra?: Extra;
};

export interface Extra {
  roles?: Roles;
}

export interface Roles {
  Roles?: Role[];
}

export interface Role {
  keyId: string;
  roleCode: string;
  roleName: string;
  rolesType: number;
  remark?: any;
  isUse?: any;
  isSystem?: any;
  attributeValue?: number;
}
