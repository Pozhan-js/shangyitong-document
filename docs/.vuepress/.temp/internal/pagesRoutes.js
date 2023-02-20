import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"首页"},["/index.html","/README.md"]],
  ["v-7e7b467b","/intro/api.html",{"title":"接口文档"},["/intro/api","/intro/api.md"]],
  ["v-63b9ef10","/intro/code.html",{"title":"项目代码"},["/intro/code","/intro/code.md"]],
  ["v-f32d7d40","/intro/dev.html",{"title":"项目开发流程"},["/intro/dev","/intro/dev.md"]],
  ["v-7d0ce4de","/intro/learn.html",{"title":"我能学到什么？"},["/intro/learn","/intro/learn.md"]],
  ["v-33eab86d","/intro/proto.html",{"title":"项目原型图"},["/intro/proto","/intro/proto.md"]],
  ["v-f9e30908","/intro/",{"title":"项目功能演示"},["/intro/index.html","/intro/README.md"]],
  ["v-5faaa051","/intro/technology.html",{"title":"技术选型"},["/intro/technology","/intro/technology.md"]],
  ["v-3f70b523","/other/i18n.html",{"title":"国际化"},["/other/i18n","/other/i18n.md"]],
  ["v-e4cb1150","/other/",{"title":"项目配置"},["/other/index.html","/other/README.md"]],
  ["v-26a0c302","/other/request.html",{"title":"发送请求流程"},["/other/request","/other/request.md"]],
  ["v-6f00514e","/project/base.html",{"title":"搭建路由"},["/project/base","/project/base.md"]],
  ["v-0971ccd8","/project/dict.html",{"title":"数据管理 - 数据字典"},["/project/dict","/project/dict.md"]],
  ["v-81acf0dc","/project/hospitalList.html",{"title":"医院管理 - 医院列表"},["/project/hospitalList","/project/hospitalList.md"]],
  ["v-95cb8380","/project/hospitalSet.html",{"title":"医院管理 - 医院设置"},["/project/hospitalSet","/project/hospitalSet.md"]],
  ["v-c9bbfba2","/project/",{"title":"项目 Git 管理"},["/project/index.html","/project/README.md"]],
  ["v-717e4787","/project/statistics.html",{"title":"统计管理 - 预约统计"},["/project/statistics","/project/statistics.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
