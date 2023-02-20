export const data = {
  "key": "v-f32d7d40",
  "path": "/intro/dev.html",
  "title": "项目开发流程",
  "lang": "zh-CN",
  "frontmatter": {},
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
  "filePathRelative": "intro/dev.md"
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
