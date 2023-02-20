# 项目配置

## 路径别名

### 概述

开发时当组件层级太深时，我们引入其他目录下文件需要回退很多层目录，很麻烦。

路径别名则提供另外一种写路径的方式，或者说路径简写，让我们可以从根路径出发直接写路径，简单方便。

### 配置

```json
// tsconfig.extend.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@api/*": ["./src/api/*"],
      "@assets/*": ["./src/assets/*"],
      "@comps/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}
```

内部还做了两件事：

1. 实现功能：通过插件将上述配置加载到 `craco.config.js` , 最终会修改 `React` 脚手架配置，所以就可以项目中使用上述路径别名。
2. 路径提示：通过 extends 将上述配置加载到 `tsconfig.json` 中，此时在 `VSCode` 写代码才会有路径提示。

我们将来如果要添加新的路径别名，只需要修改 `tsconfig.extend.json` 即可。

## 代理服务器

### 概述

代理服务器可以解决开发时的跨域问题。

### 原理图

![代理服务器](/imgs/intro/proxy.png)

### 配置

激活开发服务器代理功能，就要进行代理服务武配置

```js{29-42}
// craco.config.js
const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
	plugins: [
		// 自定义主题
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						// modifyVars: { "@primary-color": "#1DA57A" },
						javascriptEnabled: true,
					},
				},
			},
		},
		// 路径别名
		{
			plugin: CracoAlias,
			options: {
				source: "tsconfig",
				baseUrl: "./",
				tsConfigPath: "./tsconfig.extend.json",
			},
		},
	],
	// 开发服务器配置
	devServer: {
		// 激活代理服务器
		proxy: {
			// 将来以/dev-api开头的请求，就会被开发服务器转发到目标服务器去。
			"/dev-api": { // 需要转发的请求前缀
				target: "http://syt-api.atguigu.cn", // 目标服务器地址
				changeOrigin: true, // 允许跨域
				pathRewrite: { // 路径重写
					"^/dev-api": "",
				},
			},
		},
	},
};
```

需要注意的是，一旦生产环境打包项目，服务器以及相关配置并不会打包进去，所以如果运行打包后的项目，还会产生跨域问题。

最终还是需要服务端来解决，将来我们会学习 `nginx` 来解决此问题。
