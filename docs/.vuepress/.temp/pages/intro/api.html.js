export const data = {
  "key": "v-7e7b467b",
  "path": "/intro/api.html",
  "title": "接口文档",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "测试接口",
      "slug": "测试接口",
      "children": []
    }
  ],
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
  "filePathRelative": "intro/api.md"
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
