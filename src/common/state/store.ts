import {
  defaultAppStatusState,
  getBaseReducerMap,
  getDefaultBaseState,
  ON_USER_LOGOUT,
} from '@retina360-ai/core-ui-library-v2';
import {AnyAction, applyMiddleware, combineReducers, createStore, ReducersMapObject, Store} from 'redux';
import thunk from 'redux-thunk';
import {IApplicationState} from './objects';
import { composeEnhancers, getAuthState } from '@retina360-ai/core-ui-library-v2';
import { defaultUserRoleState, UserRoleReducer } from './role/reducer';

const getAppDefaultState = (): IApplicationState => {
  let authState = getAuthState();
  return {
    ...getDefaultBaseState(authState),
    userRole:defaultUserRoleState
  };
};

const getAppReducerMap = (): ReducersMapObject<IApplicationState, AnyAction> => {
  let authState = getAuthState();
  return{
    ...getBaseReducerMap(authState),
   userRole:UserRoleReducer 
  };
};

export const createAppStore = (): Store<IApplicationState> => {
  const appReducer = combineReducers(getAppReducerMap());

  //resetting the state on user logoff
  const rootReducer = (state: IApplicationState, action: AnyAction) => {
    if (action.type === ON_USER_LOGOUT) {
      //resetting the store except the static data that is common for all users (ex:theme)
      const {themeData} = state;
      state = {themeData, appState: {...defaultAppStatusState, appTitle: state.appState.appTitle}} as IApplicationState;
    }
    return appReducer(state, action);
  };

  return createStore(rootReducer, getAppDefaultState(), composeEnhancers(applyMiddleware(thunk)));
};
