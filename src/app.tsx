import {
  fetchProfile,
  IBaseApplicationState,
  setPageStatus,
  StatusEnum,
} from '@retina360-ai/core-ui-library-v2';
import {
  AnonymousRouter,
  ApplicationOptionContext,
  AuthenticatedRouter,
  getAccessToken,
  IApplicationOptionContextData,
  IFlatMenuOption,
  LoadingIndicator,
  NotFoundIndicator,
  StateContainer,
  useGetAuthToken,
  useTokenRefresh
} from '@retina360-ai/core-ui-library-v2';
import UnAuthorizedIndicator from '@retina360-ai/core-ui-library-v2/lib/base-components/app-state/UnAuthorizedIndicator';
import { RFMenu } from '@retina360-ai/core-ui-library-v2';
import { IRFMenuDefinition } from '@retina360-ai/core-ui-library-v2/lib/form-components/objects/menu';
import { toLower } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Redirect, Route, useLocation } from 'react-router-dom';
import { ChangePasswordLink } from './common/components/changePassword';
import { HelpDocumentDownload } from './common/components/helpDocumentDownload';
import { RoleNotMappedMessage } from './common/components/roleNotMappedScreen';
import { SwitchRoleLink } from './common/components/switchRole';
import { CRM_USER } from './common/constants';
import { ICRMAppOptions } from './common/objects';
import { lowerRouteKeys, routesWithLowerKey } from './common/routes';
import { IApplicationState, IUserRoleItem } from './common/state/objects';
import { fetchUserRoles } from './common/state/role/actions';
import { getRouteComponents } from './common/utils/routeFromMenu';

export const App = () => {
  const dispatch = useDispatch();
  const { options } = React.useContext(ApplicationOptionContext);

  //OIDC token refresh
  useTokenRefresh();

  const isAuthenticated = useSelector<IBaseApplicationState, boolean>((state) => state.authState.isAuthenticated);

  //fetch user profile
  React.useEffect(() => {
    dispatch(setPageStatus(StatusEnum.SUCCESS));
    if (isAuthenticated) {
      dispatch(fetchProfile(getAccessToken(), options.oidcOptions.providerType));
    }
  }, [isAuthenticated]);

  return <HashRouter>{isAuthenticated ? <AuthRouteContainer /> : <AnonymousRouter preventDataShare />}</HashRouter>;
};

interface IState {
  isMenuFetched: boolean;
  homeRouteName: string;
  navbarFlatMenuOptions: IFlatMenuOption[];
}

// Get the full query string (e.g., "?source=inventory")
const searchParams = new URLSearchParams(window.location.search);
const source = searchParams.get('source');
if (source) {
  sessionStorage.setItem('appSource', source);
}

const appSource = sessionStorage.getItem('appSource');

{ appSource === 'energyAccounting' ? document.title = 'Energy Accounting' : appSource === 'crm' ? document.title = 'Customer Relationship Manager (CRM)' : document.title = 'Customer Relationship Manager (CRM)' }

//container component to
//1.fetch the menu data and set the first menu item as home page
export const AuthRouteContainer: React.FC = () => {
  const dispatch = useDispatch();
  const options = React.useContext(ApplicationOptionContext).options as ICRMAppOptions;

  // const sidebarMenuStyle = useSelector<IBaseApplicationState, IRetinaSidebarMenuStyle>(
  //   (state) => state.themeData.currentTheme.sidebarMenu
  // );

  const roleFetchStatus = useSelector<IApplicationState, StatusEnum>((state) => state.userRole.pageLoadRoleFetchStatus);
  const roleId = useSelector<IApplicationState, string>((state) => state.userRole.activeRoleId);
  const roleList = useSelector<IApplicationState, IUserRoleItem[]>((state) => state.userRole.roleList);

  const roleDescription = roleList.find((x) => x.roleId === roleId)?.roleDescription;

  const [state, setState] = React.useState<IState>({
    isMenuFetched: false,
    homeRouteName: null,
    navbarFlatMenuOptions: [],
  });

  const getAuthToken = useGetAuthToken();

  React.useEffect(() => {
    dispatch(fetchUserRoles(getAuthToken()));
  }, []);

  //appending the roleId to options to pass this roleId to each api call
  const updatedContextData = React.useMemo((): IApplicationOptionContextData => {
    let radarOptions: ICRMAppOptions = {
      ...options,
      appendDataToQueryApi: { roleId, appSource },
      profilePersonaSecondaryText: roleDescription,
    };
    return { options: radarOptions };
  }, [options, roleId, roleDescription, appSource]);

  //menu definition..after the menu data fetch, setting the first item as home page
  const menuDefinition = React.useMemo((): IRFMenuDefinition => {
    //let menuStyle = sidebarMenuStyle ?? ({} as IRetinaSidebarMenuStyle);
    return {
      isSimulation: true,
      // simulationDataFileName: appSource === 'energyAccounting' ? 'energyAccountingMenu.json' : appSource === 'crm' ? 'crmMenu.json':appSource==='clm'? 'clmMenu.json'  : 'crmMenu.json',
      simulationDataFileName: 'clmMenu.json',
      onLoadEventParams: {
        moduleName: CRM_USER,
        serviceName: 'INIT_MENU',
        callbackMethod: (data) => {
          //console.log('menu data', data);
          let firstRoute = data.navbarFlatMenuOptions.find((x) => x.route)?.route;
          setState((prevState) => ({
            ...prevState,
            isMenuFetched: true,
            homeRouteName: firstRoute,
            navbarFlatMenuOptions: data.navbarFlatMenuOptions,
          }));
        },
      },
      // sidebarMenu: {
      //   name: 'sidebarMenuList',
      //   configuration: {
      //     //isIconOnlyMenu: true,
      //     subMenuType: 'collapsible',
      //   },
      //   styles: {
      //     font: {
      //       color: menuStyle.fontColor,
      //     },
      //     icon: {
      //       color: menuStyle.iconColor,
      //     },
      //     background: menuStyle.backgroundColor,
      //     activeBackground: menuStyle.activeBackgroundColor,
      //     activeFontColor: menuStyle.activeFontColor,
      //   },
      //   filterSidebarMenuOptions: (sidebarMenuOptions, _currentPath) => {
      //     //filter the sidebars based on the current route..
      //     let lowerCurrentPath = toLower(_currentPath);
      //     let routeKey = lowerRouteKeys.find((x) => x == lowerCurrentPath);
      //     if (!routeKey) {
      //       return [];
      //     }
      //     //getting current route module name..
      //     let moduleName = routesWithLowerKey[routeKey].moduleName;
      //     //getting all routes that matches with the current route module name..
      //     let moduleRoutes = lowerRouteKeys.filter((key) => routesWithLowerKey[key].moduleName == moduleName);
      //     return sidebarMenuOptions.filter((x) => {
      //       if (x.route) {
      //         //filter sidbar menu options that matches with the module routes...
      //         return moduleRoutes.includes(toLower(x.route));
      //       } else {
      //         //if the sidebar menu options doesn't have the route(ie, for the grouped routes, parent will not have route) then comparing the childrens and if any child route match with the module routes then showing that menu option in sidebar...
      //         return x.children?.find((y) => moduleRoutes.includes(toLower(y.route)));
      //       }
      //     });
      //   },
      //   activeMenuKeyProvider: (options, _currentPath, currentQueryParams, defaultKeyProvider) => {
      //     let lowerCurrentPath = toLower(_currentPath);
      //     let parentRoute = routesWithLowerKey[lowerCurrentPath]?.parentRoute;
      //     return defaultKeyProvider(parentRoute);
      //   },
      // },
      navbarMenu: {
        name: 'navbarMenuList',
        activeMenuKeyProvider: (options, _currentPath, currentQueryParams, defaultKeyProvider) => {
          // if (!currentPath) {
          //   return defaultKeyProvider();
          // }
          //let path = currentPath.split('/')[1];//currentPath=>'/master/user/12'
          //return path;

          let lowerCurrentPath = toLower(_currentPath);
          let routeKey = lowerRouteKeys.find((x) => x == lowerCurrentPath);
          if (!routeKey) {
            return defaultKeyProvider();
          }

          return routesWithLowerKey[routeKey].moduleName;
        },
      },
      menuType: 'NAV_MENU_BAR',
    };
  }, []); //sidebarMenuStyle

  const newRouteComponents = React.useMemo(() => {
    return getRouteComponents(state.navbarFlatMenuOptions);
  }, [state.navbarFlatMenuOptions]);

  //console.log('newRouteComponents', newRouteComponents);

  // if (!sidebarMenuStyle) {
  //   return null;
  // }

  return (
    <StateContainer status={roleFetchStatus}>
      <ApplicationOptionContext.Provider value={updatedContextData}>
        <RFMenu menuDefintion={menuDefinition}>
          {state.isMenuFetched ? (
            <AuthenticatedRouter
              routes={newRouteComponents}
              renderInPageContainer
              profileComponents={
                <>
                  <SwitchRoleLink />
                  <ChangePasswordLink />
                </>
              }
              notFoundComponent={<NotFoundPage />}
              navBarContent={<HelpDocumentDownload />}>
              <Route
                key={'home'}
                exact
                path={'/Home'}
                render={() =>
                  state.homeRouteName ? (
                    <Redirect to={state.homeRouteName} />
                  ) : (
                    <>{roleList.length > 0 ? <div>No found</div> : <RoleNotMappedMessage />}</>
                  )
                }
              />
            </AuthenticatedRouter>
          ) : (
            <div style={{ position: 'absolute', top: '50%', right: '50%' }}>
              <LoadingIndicator />
            </div>
          )}
        </RFMenu>
      </ApplicationOptionContext.Provider>
    </StateContainer>
  );
};

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  let isRouteAvailable = routesWithLowerKey[toLower(pathname)];

  return isRouteAvailable ? <UnAuthorizedIndicator /> : <NotFoundIndicator />;
};
