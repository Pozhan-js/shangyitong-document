# 项目代码

## 项目基础模板

详见`syt-admin-base`项目

## 项目目录文件介绍

```
├── public # 公共静态资源目录
│   ├── favicon.ico # 网站图标
│   ├── index.html # 主页面
│   ├── logo192.png # app图标
│   ├── logo512.png # app图标
│   ├── manifest.json # app配置文件
│   └── robots.txt # 网站跟爬虫间的协议
├── src # 主目录
│   ├── api # 接口文件
│   ├── app # redux配置文件
│   ├── components # 公共组件
│   │   ├── Loading # loading组件
│   │   ├── Redirect # 重定向组件
│   │   └── withAuthorization # 权限认证组件
│   ├── layouts # 主要布局组件
│   ├── locales # i18n国际化配置
│   ├── pages # 路由组件
│   ├── routes # 路由配置
│   ├── styles # 全局/公共样式
│   ├── utils # 工具函数
│   │   └── http # 封装请求函数
│   ├── App.tsx # App组件
│   ├── index.ts # 主入口
│   ├── react-app-env.d.ts # 类型文件，在编译时会引入额外文件
│   ├── reportWebVitals.ts # 基于Google的网站性能分析文件
│   └── setupTests.ts # 安装测试
├── .env.development # 开发环境加载的环境变量配置
├── .env.production # 生产环境加载的环境变量配置
├── .gitignore # git忽略文件
├── craco.config.js # react脚手架配置文件
├── package.json # 包文件
├── README.MD # 项目说明文件
├── tsconfig.extend.json # 路径别名配置文件
├── tsconfig.json # ts配置文件
└── yarn.lock # yarn下载包的缓存文件
```
