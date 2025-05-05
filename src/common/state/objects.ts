import {IBaseApplicationState, StatusEnum} from '@retina360-ai/core-ui-library-v2';

export interface IUserRoleItem {
  roleId: string;
  isDefaultRole: string;
  roleDescription: string;
}

export interface IUserRoleState {
  activeRoleId: string;
  roleList: IUserRoleItem[];
  pageLoadRoleFetchStatus: StatusEnum;
}

export interface IApplicationState extends IBaseApplicationState {
  userRole: IUserRoleState;
}
