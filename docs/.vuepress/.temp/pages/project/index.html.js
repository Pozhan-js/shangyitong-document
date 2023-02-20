export const data = {
  "key": "v-c9bbfba2",
  "path": "/project/",
  "title": "项目 Git 管理",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "本地仓库版本控制",
      "slug": "本地仓库版本控制",
      "children": []
    },
    {
      "level": 2,
      "title": "本地仓库与远程仓库的交互",
      "slug": "本地仓库与远程仓库的交互",
      "children": [
        {
          "level": 3,
          "title": "1. 预备",
          "slug": "_1-预备",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 远程有仓库，本地没有",
          "slug": "_2-远程有仓库-本地没有",
          "children": []
        },
        {
          "level": 3,
          "title": "3. 本地有仓库，远程没有",
          "slug": "_3-本地有仓库-远程没有",
          "children": []
        },
        {
          "level": 3,
          "title": "4. 本地仓库、远程仓库都有，并且已经关联好了",
          "slug": "_4-本地仓库、远程仓库都有-并且已经关联好了",
          "children": []
        }
      ]
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
  "filePathRelative": "project/README.md"
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
