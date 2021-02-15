import React from "react";
import type { FC } from "react";
import { Route } from "react-router-dom";
import Page from "./Page";
import PageLayout from "./PageLayout";
import type {
  IPageProps,
  IRouteMapper,
  IRouteMenu,
  PageRouteProps,
} from "./types";

/**
 * 渲染视图
 *
 * @param param0
 */
export const PageView: FC<IPageProps> = ({ route, mapper, ...rest }) =>
  !route.layout ? (
    <Page route={route} mapper={mapper} {...rest} />
  ) : (
    <PageLayout route={route} mapper={mapper} {...rest}>
      {(pageProps) => <Page {...pageProps} />}
    </PageLayout>
  );

/**
 * 页面路由组件
 *
 * @param param0
 */
export const PageRoute: FC<PageRouteProps> = ({ mapper, ...rest }) => (
  <Route
    path={rest.path}
    exact={rest.exact}
    render={(props) => <PageView route={rest} mapper={mapper} {...props} />}
  />
);

/**
 * 获取子路由
 *
 * @param route
 * @param mapper
 */
export const renderLayoutRoutes = (route: IRouteMenu, mapper: IRouteMapper) =>
  route.children!.map((child) => {
    // child.path = `/${trim(route.path, '/')}/${trim(child.path, '/')}`;
    return (
      <Route
        key={child.name || child.path}
        path={child.path}
        exact={child.exact}
        render={(props) =>
          route.layout && (
            <PageLayout route={route} mapper={mapper} {...props}>
              {(pageProps) => <PageView {...pageProps} route={child} />}
            </PageLayout>
          )
        }
      />
    );
  });
