import { BasicLayout } from "../layouts";
import type { IRouteMenu } from "/@/components/Router/types";
export const routes: IRouteMenu[] = [
  {
    exact: true,
    name: "dashboard",
    path: "/",
    page: "dashboard/welcome",
    layout: BasicLayout,
  },
  {
    name: "redirect",
    path: "/redirect",
    redirect: "/",
  },
  // {
  //   name: "user",
  //   path: "/user",
  //   layout: "basic",
  //   redirect: "/user/roles",
  //   children: [
  //     {
  //       exact: true,
  //       name: "user.users",
  //       path: "/user/users",
  //       page: "user.users",
  //     },
  //     {
  //       name: "user.roles",
  //       path: "/user/roles",
  //       page: "user.roles",
  //     },
  //   ],
  // },
  {
    name: "blog",
    path: "/blog",
    layout: BasicLayout,
    redirect: "/blog/articles",
    children: [
      {
        exact: true,
        name: "article",
        path: "/blog/articles",
        page: "blog/articles/index",
      },
      //     {
      //       name: "category",
      //       path: "/blog/categories",
      //       page: "blog.categories.list",
      //     },
    ],
  },
  // {
  //   name: "404",
  //   path: "*",
  //   page: "errors.404",
  // },
];
