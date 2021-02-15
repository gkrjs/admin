import React from "react";
import loadable from "@loadable/component";
import type { FC } from "react";
import type { RouteComponentProps } from "react-router-dom";
import pMinDelay from "p-min-delay";
import type { IPageProps, IRouteMapper, IRouteMenu } from "./types";
import { PageLoading } from "../Loading";
const AsyncPage = loadable<{ [key: string]: any }>(
  (props) => import(/* @vite-ignore */ `../../pages/${props.page}`),
  {
    fallback: <PageLoading />,
  }
);
/**
 * 渲染普通页面
 *
 * @param route
 * @param mapper
 * @param props
 */
const renderPage = (
  route: IRouteMenu,
  mapper: IRouteMapper,
  props: RouteComponentProps
) =>
  route.children
    ? route.page && (
        <route.page {...props} route={route}>
          {mapper(route.children, true, route)}
        </route.page>
      )
    : route.page && <route.page {...props} route={route} />;
/**
 * 渲染异步页面
 *
 * @param route
 * @param mapper
 * @param props
 */
const renderAsyncPage = (
  route: IRouteMenu,
  mapper: IRouteMapper,
  props: RouteComponentProps
) =>
  route.children
    ? route.page && (
        <AsyncPage {...props} route={route} page={route.page}>
          {mapper(route.children, true, route)}
        </AsyncPage>
      )
    : route.page && <AsyncPage {...props} route={route} page={route.page} />;

/**
 * 加载页面
 *
 * @param props
 */
const Page: FC<IPageProps> = (props) => {
  const { route, mapper, ...rest } = props;

  return (
    <>
      {typeof route.page === "string"
        ? renderAsyncPage(route, mapper, rest)
        : renderPage(route, mapper, rest)}
    </>
  );
};

export default Page;
