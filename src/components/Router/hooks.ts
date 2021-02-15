import { createContext, useContext } from "react";
import type { IRouteMenu } from "./types";

export const RouterContext = createContext<IRouteMenu[]>([]);
export const useRoutes = () => useContext(RouterContext);
