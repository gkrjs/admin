import React from "react";
import type { FC } from "react";
import { Redirect as RouterRedirect } from "react-router-dom";
import type { IRouteMenu } from "./types";

/**
 * 路由跳转组件
 *
 * @param route
 */
const Redirect: FC<IRouteMenu> = (route) => (
  <RouterRedirect
    from={route.path}
    to={route.redirect!}
    exact={route.exact}
    strict={route.strict}
  />
);

export default Redirect;
