module.exports = {
  title: "净垚的博客",
  description: "困了累了 来这里",
  theme: "reco",
  base: "/learn-vuepress/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    subSidebar: "auto",
    nav: [
      { text: "js", link: "/js/call" },
      { text: "项目工具管理", link: "/build/Monorepo" },
      { text: "css", link: "/css/css" },
      {
        text: "净垚的GitHub",
        items: [{ text: "Github", link: "https://github.com/xzy-96" }],
      },
    ],
    sidebar: {
      "/js/": [
        "call",
        "bind",
        "debounce",
        "http",
        "dataurl",
        "lazy-img",
        "polymorphism",
        "a-download",
        "encapsulation",
        "inheritance",
        "strategy",
        "mediation",
      ],
      "/build/": ["Monorepo", "patch-package"],
      "/css/": ["css"],
    },
  },
};
