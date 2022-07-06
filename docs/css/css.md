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

### CSS 选择器及其优先级

1. 行内样式 1000
2. id 选择器 100
3. class 选择器 属性选择器 10
4. 标签选择器 伪类选择器 1
5. 通配符选择器 （\* ，>，+） 0
   !important 声明的样式的优先级最高；

### display 的 block、inline 和 inline-block 的区别

- block 会独占一行 多的元素会另起一行 可是设置 padding margin height width
- inline 不会独占一行 不可以设置高度和宽度 不可以设置垂直方向 margin 和 padding
- inline-block 将对象设置成 inline 但会有 block 的功能 可以设置高度宽度

### 画一条 0.5px 的线

- tranfrom:scale(0.5,0.5)
- meta viewport 只能移动端

```
<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
```

### flex
flex 弹性布局 子float  vertical-aglin clear 会失效
flex有两个轴 水平轴和 垂直轴 默认是水平
- flex-direction：规定 主轴方向
- felx-wrap : 是否可以换行
- flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式
- jusity-centtent 定义主轴的 排列顺序 规则
- algin-itmes 定义交叉轴的 对齐规则
