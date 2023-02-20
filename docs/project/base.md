# 搭建路由

每次开发新的功能模块，都需要先进行搭建路由。

所以接下来我们以搭建医院管理-医院设置/医院列表为例，来带大家搭建路由。

## 新建路由组件

我们只需要创建最简单的组件，不需要写具体细节。

我们需要创建两个路由组件：

- 医院设置

```tsx
// src/pages/hospital/hospitalSet/index.tsx
import React from "react";

function HospitalSet() {
  return <div>HospitalSet</div>;
}

export default HospitalSet;
```

- 医院列表

```tsx{61-62,92-132}
// src/pages/hospital/hospitalList/index.tsx
import React from "react";

function HospitalList() {
	return <div>HospitalList</div>;
}

export default HospitalList;
```

## 进行配置路由

配置路由，方能通过地址访问我们的路由组件

```tsx{15-17,47-78}
// src/routes/index.ts
import React, { lazy, Suspense, FC } from "react";
import { useRoutes } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

import { Layout, EmptyLayout, CompLayout } from "../layouts";
import Loading from "@comps/Loading";
import Redirect from "@comps/Redirect";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));

// 引入路由组件
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));

const load = (Comp: FC) => {
  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  );
};

const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "login",
        element: load(Login),
      },
    ],
  },
  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        path: "/syt/dashboard",
        meta: { icon: <HomeOutlined />, title: "首页" },
        element: load(Dashboard),
      },
      // 路由配置
      // 会自动根据配置来生成左侧菜单
      {
        // 路由访问路径
        path: "/syt/hospital",
        // 将来左侧菜单会根据meta内容生成
        meta: {
          // 菜单图标
          icon: <ShopOutlined />,
          // 菜单标题
          title: "医院管理",
        },
        // element代表要渲染的组件
        // 而父级菜单并不会加载真正的内容，所以渲染的其实就一个Outlet
        // Outlet组件就是渲染子路由组件：也就是医院设置、医院列表组件
        element: <CompLayout />,
        // 子路由配置
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: { title: "医院设置" },
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: { title: "医院列表" },
            element: load(HospitalList),
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    element: load(NotFound),
  },
  {
    path: "*",
    element: <Redirect to="/404" />,
  },
];

// 渲染路由
// 注意：首字母必须大写
export const RenderRoutes = () => {
  // react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成
  return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt");
  return routes[currentIndex].children as XRoutes;
};

export default routes;
```

此时我们可以打开项目，通过点击左侧菜单，就访问我们定义的路由组件了~
