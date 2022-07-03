### src 和 href 的区别

- src 引入资源 会导致 js 阻塞 ，所以一般放到 页面底部
- href 表示超文本引入 当浏览器识别到会 异步下载资源

### 对 html 语义化

- 可读性更好 解构清晰
- 便于 SEO

```html
<header>头部</header>

<nav>导航</nav>

<section>区块</section>

<main>主要区域</main>

<article>主要内容</article>

<aside>侧边栏</aside>

<footer>底部</footer>
```

### DOCTYPE(⽂档类型) 的作⽤

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型的声明，它告诉浏览器应该以什么样的文档类型定义来解析文档 （html 或 XHTML），浏览器渲染页面有两种模式（可通过 document.compatMode 获取）

- 标准模式 浏览器使用 W3C 的标准解析渲染页面。以其最高标准呈现页面
- 怪异模式 浏览器使用自己的怪异模式解析渲染页面 以`向后兼容`的方式显示

### script 标签中 defer 和 async 的区别

defer 是等页面加载完 在加载 async 是并发的进行的 `执行顺序` 多个 async 是异步加载并不知道顺序的

### 常用的 meta 标签有哪些

meta 标签 由 name 和 content 属性定义 `用来描述网页文档的属性`
常用的有

- chartset ，用来描述 HTML 文档的编码类型

```
<meta charset="UTF-8">
```

- keywords 页面关键词

```
<meta name="keywords" content="关键词">
```

- description，页面描述：

```
<meta name="description" content="页面描述内容" />
```

- refresh，页面重定向和刷新

```
<meta http-equiv="refresh" content="0;url=" />
```

- viewport，适配移动端，可以控制视口的大小和比例：

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

其中，content 参数有以下几种：

- width viewport ：宽度(数值/device-width)
- height viewport ：高度(数值/device-height)
- initial-scale ：初始缩放比例
- maximum-scale ：最大缩放比例
- minimum-scale ：最小缩放比例
- user-scalable ：是否允许用户缩放(yes/no）
