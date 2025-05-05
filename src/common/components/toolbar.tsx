import * as React from 'react';
import { RFScreenToolbar } from '@retina360-ai/core-ui-library-v2';
import { IRFScreenToolbarProps } from '@retina360-ai/core-ui-library-v2';
import { Link, useLocation } from 'react-router-dom';
import { Dictionary, toLower } from 'lodash';
import { lowerRouteKeys, routesWithLowerKey } from '../routes';
import { ICRMRouteComponent } from '../routes/objects';
import { CRM_MODULES } from '../routes/objects';
import { Icon } from 'office-ui-fabric-react';

const routeHistory: Dictionary<string> = {};

interface IRFCRMToolbarProps extends Omit<IRFScreenToolbarProps, 'title'> { }

export const RFCRMToolbar: React.FC<IRFCRMToolbarProps> = (props) => {
  const location = useLocation();

  const [breadcrumbs, currentPageTitle] = React.useMemo(() => {
    //getting the route obj for the current path
    let lowerCurrentPath = toLower(location.pathname);
    //adding the queryparam to local variable
    routeHistory[lowerCurrentPath] = location.search;

    return getBreadcrumbs(lowerCurrentPath);
  }, [location.pathname, location.search]);

  return (
    <RFScreenToolbar
      {...props}
      title={
        <div>
          <div className="screen-toolbar-title">{currentPageTitle}</div>
          <div className="screen-toolbar-sub-title">
            {breadcrumbs.map((x, index) => (
              <React.Fragment key={index}>
                {x.route ? <Link to={x.route}>{x.title}</Link> : <span>{x.title}</span>}
                {index !== breadcrumbs.length - 1 && (
                  <span className="mx-1">
                    <Icon iconName="ChevronRightMed" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      }
    />
  );
};

const moduleTitleMapper: Record<CRM_MODULES, string> = {
  USERADMINISTRATOR: 'User Administration',
  SETUP: 'Setup',
  CRM: 'CRM',
  ENERGYACCOUNTING: 'Energy Accounting',
  BILLING: 'Billing',
  COMMON: 'Common',
  DASHBOARD: 'Dashboard',
  REPORTS: 'Reports',
  CLM: 'CLM',
};

// const moduleDefaultRoute: Record<CRM_MODULES, string> = {
//   USERADMINISTRATOR: '/RoleMaster',
//   SETUP: '/StateSummary',
//   CRM: '/BusinessPlanSummary',
//   ENERGYACCOUNTING: '/DailyMetersummary',
//   BILLING: '/ProvisionalBillSummary',
//   COMMON: '/DocumentList',
// };

interface IRouteInfo {
  title: string;
  route?: string;
}

const getBreadcrumbs = (lowerCurrentPath: string): [IRouteInfo[], string] => {
  let breadcrumbs: IRouteInfo[] = [{ title: 'Home' }]; //{title: 'Home'}//route: '/Home'

  //let routeKey = lowerRouteKeys.find((x) => x == lowerCurrentPath);
  const routeObj = routesWithLowerKey[lowerCurrentPath]
    ? routesWithLowerKey[lowerCurrentPath]
    : ({} as ICRMRouteComponent);

  if (routeObj.moduleName) {
    breadcrumbs.push({ title: moduleTitleMapper[routeObj.moduleName] }); //route: moduleDefaultRoute[routeObj.moduleName]
  }

  breadcrumbs.push(...getParentRoutes(lowerCurrentPath));

  if (routeObj.title) {
    breadcrumbs.push({ title: routeObj.title });
  }

  return [breadcrumbs, routeObj.title];
};

const getParentRoutes = (lowerCurrentPath: string): IRouteInfo[] => {
  let parentRoutes: IRouteInfo[] = [];

  const routeObj = routesWithLowerKey[lowerCurrentPath];

  if (!routeObj) {
    return parentRoutes;
  }

  //getting the parent route obj for the current path
  let lowerParentRoute = toLower(routeObj.parentRoute);
  //let parentRouteKey = lowerRouteKeys.find((x) => x == lowerParentRoute);
  const parentRouteObj = routesWithLowerKey[lowerParentRoute];

  if (parentRouteObj) {
    //user click the link on /BusinessPlanSummary and navigation to /managebusinessplan?code=NN alog with query param..
    //from the /managebusinessplan user click another link and navigate to /ViewSite page..in that page we show the breadcrumb(CRM>Manage Business Plan>View Site)..
    //now when user click the 'Manage Business Plan' in breadcrumb the page goes back to /managebusinessplan without the query param. but we should pass the query param(?code=NN)..
    //to fix the issue we added the routeHistory to track the query params....and here we get the query params from routeHistory and appending to route to fix the issue..
    let queryParam = routeHistory[lowerParentRoute];
    let parentRoute = queryParam ? routeObj.parentRoute + queryParam : routeObj.parentRoute;
    parentRoutes.push({ title: parentRouteObj.title, route: parentRoute });

    //recursively getting the parent..
    parentRoutes.unshift(...getParentRoutes(lowerParentRoute));
  }

  return parentRoutes;
};
