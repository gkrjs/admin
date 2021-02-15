import { createBrowserHistory } from "history";
import React from "react";
import { Router as ReactRouter } from "react-router-dom";
import { RouterContext } from "./hooks";
import { mapRoutes } from "./RouteMap";
import { IRouteMenu } from "./types";

export const history = createBrowserHistory();
const Router: React.FC<{ routes: IRouteMenu[] }> = ({ routes }) => (
  <RouterContext.Provider value={routes}>
    <ReactRouter history={history}>{mapRoutes(routes)}</ReactRouter>
  </RouterContext.Provider>
);
export default Router;
