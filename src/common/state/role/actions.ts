import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IUserRoleItem, IUserRoleState} from '../objects';
import {StatusEnum, queryApi} from '@retina360-ai/core-ui-library-v2';
import {CRM_USER} from '../../constants';
import {dispatchQueryResponseMessage} from '@retina360-ai/core-ui-library-v2/lib/form-components/hook/dataFetch/useQueryData';

//export const SET_USER_ROLE_ID = 'SET_USER_ROLE_ID';
export const SET_USER_ROLES = 'SET_USER_ROLES';

// interface IOnSetUserRoleIdAction {
//   type: typeof SET_USER_ROLE_ID;
//   roleId: string;
// }

interface IOnSetUserRolesAction {
  type: typeof SET_USER_ROLES;
  roleList: IUserRoleItem[];
  status:StatusEnum;
}

export type UserRoleStateActions = IOnSetUserRolesAction;
export type UserRoleStateThunkDispatch = ThunkDispatch<IUserRoleState, any, UserRoleStateActions>;
export type UserRoleStateThunkAction<R = Promise<void>> = ThunkAction<R, IUserRoleState, any, UserRoleStateActions>;

export const fetchUserRoles = (token: string): UserRoleStateThunkAction => {
  return async (dispatch) => {
    let roleList: IUserRoleItem[] = [];
    let status = StatusEnum.NONE;
    try {
      let response = await queryApi(token, CRM_USER, 'INIT_USER_ROLES', {});
      roleList = Array.isArray(response?.data?.userRoles) ? response.data.userRoles : [];
      status = StatusEnum.SUCCESS;
      dispatchQueryResponseMessage(dispatch, response);
    } catch (err) {
      status = StatusEnum.ERROR;
    } finally {
      dispatch({type: SET_USER_ROLES, roleList, status});
    }
  };
};
