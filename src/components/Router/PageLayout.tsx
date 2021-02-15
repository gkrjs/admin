import React from "react";
import type { FC, ReactNode } from "react";
import type { RouteComponentProps } from "react-router-dom";
import type {
  ILayoutProps,
  IPageProps,
  IRouteMapper,
  IRouteMenu,
} from "./types";
import loadable from "@loadable/component";
import { isArray } from "lodash-es";

const getAsyncLayouts = (
  imports: Record<string, () => Promise<any>>,
  reg: RegExp
) => {
  return (Object.keys(imports)
    .map((key) => {
      const names = key.match(reg);
      return isArray(names) && names.length >= 2
        ? { [names[1]]: imports[key] }
        : undefined;
    })
    .filter((m) => !!m)
    .reduce((o, n) => ({ ...o, ...n }), []) as unknown) as Record<
    string,
    () => Promise<any>
  >;
};

const layouts = getAsyncLayouts(
  import.meta.glob("../../layouts/**/*.{tsx,jsx}"),
  /..\/..\/layouts\/([\w+.?\/?]+).tsx|.jsx/i
);

const AsyncLayout = loadable<{ [key: string]: any }>((props) =>
  layouts[props.layout]()
);

/**
 * 渲染布局
 *
 * @param route
 * @param page
 * @param mapper
 * @param props
 */
const renderLayout = (
  route: IRouteMenu,
  page: FC<IPageProps>,
  mapper: IRouteMapper,
  props: RouteComponentProps
) =>
  route.layout && (
    <route.layout route={route} {...props}>
      {page({ route, mapper, ...props })}
    </route.layout>
  );

/**
 * 渲染异步布局
 *
 * @param route
 * @param page
 * @param mapper
 * @param props
 */
const renderAsyncLayout = (
  route: IRouteMenu,
  page: FC<IPageProps>,
  mapper: IRouteMapper,
  props: RouteComponentProps
): ReactNode => {
  return (
    <AsyncLayout {...props} route={route} layout={route.layout}>
      {page({ route, mapper, ...props })}
    </AsyncLayout>
  );
};

/**
 * 加载页面蒲剧
 *
 * @param props
 */
const PageLayout: FC<ILayoutProps> = (props) => {
  const { route, children, mapper, ...rest } = props;
  return (
    <>
      {typeof route.layout === "string"
        ? renderAsyncLayout(route, children, mapper, rest)
        : renderLayout(route, children, mapper, rest)}
    </>
  );
};

export default PageLayout;
