const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  // 站点配置
  base: "/syt-admin-docs/",
  lang: "zh-CN",
  title: "尚医通",
  description: "一个基于React的后台管理项目",
  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/imgs/logo.png",
    navbar: [
      {
        text: "项目介绍",
        link: "/intro/",
      },
      {
        text: "开始开发",
        link: "/project/",
      },
      {
        text: "其他内容",
        link: "/other/",
      },
    ],
    sidebar: {
      "/intro/": [
        {
          text: "项目介绍",
          children: ["/intro/README.md", "/intro/proto.md", "/intro/dev.md", "/intro/api.md", "/intro/technology.md", "/intro/code.md", "/intro/learn.md"],
        },
      ],
      "/project/": [
        {
          text: "开始开发",
          children: ["/project/README.md", "/project/base.md", "/project/hospitalSet.md", "/project/hospitalList.md", "/project/dict.md", "/project/statistics.md"],
        },
      ],
      "/other/": [
        {
          text: "其他内容",
          children: ["/other/README.md", "/other/request.md", "/other/i18n.md"],
        },
      ],
    },
  },
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCode({
      // 插件选项
      pure: true,
    }),
    // [
    //   "@vuepress/plugin-external-link-icon",
    //   {
    //     locales: {
    //       "/": {
    //         openInNewWindow: "open in new window",
    //       },
    //       "/zh/": {
    //         openInNewWindow: "在新窗口打开",
    //       },
    //     },
    //   },
    // ],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
          "/zh/": {
            placeholder: "搜索",
          },
        },
      },
    ],
  ],
};
