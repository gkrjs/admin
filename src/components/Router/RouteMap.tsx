import React from "react";
import type { ReactNode } from "react";
import { Switch } from "react-router-dom";
import Redirect from "./Redirect";
import { PageRoute, renderLayoutRoutes } from "./RouteView";
// import { trim } from 'lodash';
import type { IRouteMapper } from "./types";
/**
 * 映射并生成最终路由
 *
 * @param routeList
 * @param addSwitch
 */
export const mapRoutes: IRouteMapper = (routeList, addSwitch = true) => {
  const routes = routeList
    .filter((route) => route.path !== undefined)
    .map((route) => {
      // if (parent !== undefined) {
      //     route.path = `/${trim(parent.path, '/')}/${trim(
      //         route.path,
      //         '/',
      //     )}`;
      // }
      let predirect: ReactNode = null;
      if (route.redirect) {
        route.exact = true;
        predirect = <Redirect key={route.name || route.path} {...route} />;
        if (!route.children) return [predirect];
      }
      if (!route.page) {
        if (!route.children) return [null, predirect];
        if (!route.layout) {
          return [
            predirect,
            ...(mapRoutes(route.children, false, route) as ReactNode[]),
          ];
        }
        return [predirect, ...renderLayoutRoutes(route, mapRoutes)];
      }
      return [
        predirect,
        <PageRoute
          key={route.name || route.path}
          mapper={mapRoutes}
          {...route}
        />,
      ];
    })
    .reduce((o, n) => [...o, ...n], [])
    .filter((route) => route !== null && route !== undefined);

  return addSwitch ? <Switch>{routes}</Switch> : routes;
};
