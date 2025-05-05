import {IFlatMenuOption} from '@retina360-ai/core-ui-library-v2';
import {RouteComponentDictionary, routeComponents, routes} from '../routes';
import {ICRMRouteComponent} from '../routes/objects';
import {keys} from 'lodash';

interface ICRMRouteComponentExtended extends ICRMRouteComponent {
  routeName: string;
}

let routeDetailedArr: ICRMRouteComponentExtended[] = [];
keys(routes).forEach((x) => {
  routeDetailedArr.push({
    ...routes[x],
    routeName: x,
  });
});

/**
 * get route components based on the menu configured for the user
 * @param navbarFlatMenuOptions
 * @returns
 */
export const getRouteComponents = (navbarFlatMenuOptions: IFlatMenuOption[]): RouteComponentDictionary => {
  let newRouteComponents: RouteComponentDictionary = {};

  if (!Array.isArray(navbarFlatMenuOptions)) {
    return newRouteComponents;
  }

  navbarFlatMenuOptions.forEach((x) => {
    if (x.route && routeComponents[x.route]) {
      newRouteComponents[x.route] = routeComponents[x.route];
      //getting the current route child routes...
      getChildRoutes(x.route).forEach((y) => {
        newRouteComponents[y.routeName] = routeComponents[y.routeName];
      });
    }
  });

  return newRouteComponents;
};

const getChildRoutes = (routeName: string) => {
  let childRoutes = routeDetailedArr.filter((x) => x.parentRoute === routeName);

  if (childRoutes.length) {
    childRoutes.forEach((x) => {
      //recursively calling the getChildRoutes to get the nested child routes...
      childRoutes.push(...getChildRoutes(x.routeName));
    });
  }

  return childRoutes;
};
