import {Reducer} from 'redux';
import {IUserRoleItem, IUserRoleState} from '../objects';
import {SET_USER_ROLES, UserRoleStateActions} from './actions';
import {getUserRoleFromSession} from '../../utils';
import { StatusEnum } from '@retina360-ai/core-ui-library-v2';

export const defaultUserRoleState: IUserRoleState = {
  activeRoleId: getUserRoleFromSession(),
  roleList: [],
  pageLoadRoleFetchStatus: StatusEnum.LOADING
};

export const UserRoleReducer: Reducer<IUserRoleState, UserRoleStateActions> = (
  state: IUserRoleState = defaultUserRoleState,
  action: UserRoleStateActions
): IUserRoleState => {
  switch (action.type) {
    // case SET_USER_ROLE_ID:
    //   return {...state, activeRoleId: action.roleId};
    case SET_USER_ROLES:
      let roleId:string = null;
      if(state.activeRoleId){
        //check if activeRoleId present in the roleList
        if(action.roleList.find((x)=>x.roleId == state.activeRoleId)){
          roleId = state.activeRoleId;
        }
      }
      roleId = roleId ? roleId : getDefaultRole(action.roleList);
      //let roleId = state.activeRoleId ? state.activeRoleId : getDefaultRole(action.roleList);
      return {...state, roleList: action.roleList, pageLoadRoleFetchStatus: action.status, activeRoleId: roleId};
    default:
      return state;
  }
};

const getDefaultRole = (roleList: IUserRoleItem[]) => {
  //if any default role using that role otherwise getting the first role
  let roleId = roleList.find((x) => x.isDefaultRole == 'YES')?.roleId ?? roleList[0]?.roleId ?? null;
  return roleId;
};
