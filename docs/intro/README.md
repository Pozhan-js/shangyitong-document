# 项目功能演示

## 下载依赖

**建议使用 yarn 下载依赖**

1. 安装 yarn

```
npm i yarn -g
```

2. 配置 yarn 的淘宝镜像

```
yarn config set registry https://registry.npmmirror.com/
```

原来淘宝镜像地址即将失效，注意更换新的。

> [淘宝 npm 域名即将切换](https://zhuanlan.zhihu.com/p/465424728)

3. 下载依赖

**注意来到项目根目录**

```
yarn
```

## 运行指令

运行项目的命令都在 package.json 中 scripts 里面

- 启动开发环境: 查看项目运行效果
```
yarn start 
```
- 启动生产环境：项目打包上线
```
yarn build 
```

## 查看效果

开发环境下会自动打开浏览器，我们直接查看效果