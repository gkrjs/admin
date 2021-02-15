import React from "react";
import type { FC, ReactNode } from "react";
import type { RedirectProps, RouteComponentProps } from "react-router-dom";

export type IRouteMenu = {
  /**
   * @name 子菜单
   */
  children?: IRouteMenu[];
  /**
   * @name 在菜单中隐藏子节点
   */
  hideChildrenInMenu?: boolean;
  /**
   * @name 在菜单中隐藏自己和子节点
   */
  hideInMenu?: boolean;
  /**
   * @name 菜单的icon
   */
  icon?: React.ReactNode;
  /**
   * @name 自定义菜单的国际化 key
   */
  locale?: string | false;
  /**
   * @name 菜单的名字
   */
  name?: string;
  /**
   * @name 用于标定选中的值，默认是 path
   */
  key?: string;
  /**
   * @name disable 菜单选项
   */
  disabled?: boolean;
  /**
   * @name 路径
   */
  path?: string;
  /**
   * @name 自定义父节点
   * @description 当此节点被选中的时候也会选中 parentKeys 的节点
   */
  parentKeys?: string[];
  /**
   * @name 隐藏自己，并且将子节点提升到与自己平级
   */
  flatMenu?: boolean;

  exact?: boolean;

  /**
   * 跳转路由
   *
   * @type {RedirectProps['to']}
   */
  redirect?: RedirectProps["to"];

  /**
   * 布局路由
   *
   * @type {(FC<IRouteProps> | string)}
   */
  layout?: FC<IRouteProps> | string;
  /**
   * 页面路由
   */
  page?: FC<IRouteProps> | string;
  [key: string]: any;
};

export type IRouteProps = RouteComponentProps & {
  route: IRouteMenu;
};

export interface IRouteMapper {
  (routeList: IRouteMenu[], addSwitch?: boolean, parent?: IRouteMenu):
    | ReactNode
    | ReactNode[];
}

export type IPageProps = RouteComponentProps & {
  route: IRouteMenu;
  mapper: IRouteMapper;
};

export type ILayoutProps = IPageProps & {
  children: FC<IPageProps>;
};

export type PageRouteProps = IRouteMenu & { mapper: IRouteMapper };

export type LayoutChildRouteProps = {
  parent: IRouteMenu;
  child: IRouteMenu;
  mapper: IRouteMapper;
};
