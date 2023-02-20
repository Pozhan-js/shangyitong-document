export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "首页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "title": "首页",
    "heroImage": "/imgs/logo.png",
    "actions": [
      {
        "text": "快速开始 →",
        "link": "/intro/",
        "type": "primary"
      }
    ],
    "features": [
      {
        "title": "💡 最新技术栈",
        "details": "基于React18、Redux、TypeScript等最新技术栈开发"
      },
      {
        "title": "🛠️ 详细的文档",
        "details": "详细讲解代码整体开发流程"
      },
      {
        "title": "📦 业务讲解",
        "details": "详细讲解开发业务流程"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2022-present 尚硅谷"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1654862911000,
    "contributors": [
      {
        "name": "oldluo-ray",
        "email": "luodianlei7@163.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
