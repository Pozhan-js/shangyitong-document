export const themeData = {
  "logo": "/imgs/logo.png",
  "navbar": [
    {
      "text": "项目介绍",
      "link": "/intro/"
    },
    {
      "text": "开始开发",
      "link": "/project/"
    },
    {
      "text": "其他内容",
      "link": "/other/"
    }
  ],
  "sidebar": {
    "/intro/": [
      {
        "text": "项目介绍",
        "children": [
          "/intro/README.md",
          "/intro/proto.md",
          "/intro/dev.md",
          "/intro/api.md",
          "/intro/technology.md",
          "/intro/code.md",
          "/intro/learn.md"
        ]
      }
    ],
    "/project/": [
      {
        "text": "开始开发",
        "children": [
          "/project/README.md",
          "/project/base.md",
          "/project/hospitalSet.md",
          "/project/hospitalList.md",
          "/project/dict.md",
          "/project/statistics.md"
        ]
      }
    ],
    "/other/": [
      {
        "text": "其他内容",
        "children": [
          "/other/README.md",
          "/other/request.md",
          "/other/i18n.md"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
