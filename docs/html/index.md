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

### HTML5 有哪些更新

1. 媒体标签

- audio 音频标签

```html
<audio src="" control autoplay loop></audio>
```

属性：

controls 控制面板
autoplay 自动播放
loop=‘true’ 循环播放

- video 视频

```
<video src='' poster='imgs/aa.jpg' controls></video>
```

属性：

- poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示 当前视频文件的第一帧画面
- controls 控制面板
- source 标签

兼容不同浏览器

```
<video>
    <source src='aa.flv' type='video/flv'></source>
    <source src='aa.mp4' type='video/mp4'></source>
</video>
```

### 7. img 的 srcset 属性的作⽤

不同设备屏幕 显示不同的图片

```
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
```

srcset 是用来指定图片的地址和 对应的质量。 sizes 用来设置图片的尺寸零界点，浏览器会自动选择最小的可用图片

### 8. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

行内元素： a b span img input
块级元素： p h1 div ul li dt dl dd
空元素，即没有内容的 HTML 元素： br hr img input

### 说一下 web worker

worker 是独立于后台的 不用影响主线程 并通过 postMessage 将回调返回给主线程

worker 创建

```js
// demo_workers.js 文件代码
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();
```

```html
<!DOCTYPE html>
<html>
  <head>
     
    <meta charset="utf-8" />
     
    <title></title>
     
  </head>
  <body>
    <p>计数： <output id="result"></output></p>
    <button onclick="startWorker()">开始工作</button>
    <button onclick="stopWorker()">停止工作</button>

    <p>
      <strong>注意：</strong> Internet Explorer 9 及更早 IE 版本浏览器不支持 Web
      Workers.
    </p>

    <script>
      var w;

      function startWorker() {
        if (typeof Worker !== "undefined") {
          if (typeof w == "undefined") {
            w = new Worker("demo_workers.js");
          }
          w.onmessage = function (event) {
            document.getElementById("result").innerHTML = event.data;
          };
        } else {
          document.getElementById("result").innerHTML =
            "抱歉，你的浏览器不支持 Web Workers...";
        }
      }

      function stopWorker() {
        w.terminate();
        w = undefined;
      }
    </script>
  </body>
</html>
```

#### Web Workers 和 DOM

由于 web worker 位于外部文件中，它们无法访问下列 JavaScript 对象：

window 对象
document 对象
parent 对象

### 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

- 在线情况下 浏览器发现 html 头部有 mainfest 属性 然后请求当前路径下的 mainfest 文件 如果是第一次请求 就会离线存储 如果不是第一次 就会对比新的和旧的是否相同 相同不做操作
- 离线情况 直接用浏览器离线缓存资源

### 13. iframe 有那些优点和缺点？

优点

- 用来加载速度较慢的内容 （广告）
- 并行加载
- 跨子域通信

缺点

- 阻塞 onload 事件
- 无法被搜索引擎识别
- 产生很多页面 不好管理

### Canvas 和 SVG 的区别

svg 可缩放的矢量图 基于 xml 描述的 2D 图形语言
Canvas 是画布，通过 JavaScript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。
