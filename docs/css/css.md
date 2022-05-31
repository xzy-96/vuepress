## 显示省略号

### css 超出显示[显示省略号](https://www.cnblogs.com/sherryweb/p/12759807.html)

单行

```
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
```

多行

```
word-break: break-all;
text-overflow: ellipsis;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### display: list-item;

此元素会作为列表显示。

### backface-visibility

```
backface-visibility: visible|hidden;
```

值 描述

visible 背面是可见的。

hidden 背面是不可见的。

## getComputedStyle

`getComputedStyle`是一个可以获取当前元素所有最终使用的 CSS 属性值。返回的是一个 CSS 样式声明对象([object CSSStyleDeclaration])，只读

```
var style = window.getComputedStyle("元素","伪类")
```
