---
title: css 函数
author: 净垚
date: "2022-06-07"
---

## clamp()

> clamp(MIN, VAL, MAX)
> clamp() 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。它接收三个参数：最小值、首选值、最大值

## fluid font size

Create a heading of fluid font size.

- if viewport width is smaller than 200px, use 16px
- if viewport width is bigger than 400px, use 32px
- otherwise font-size is linearly scaled. For example if viewport is 300px = (200px + 400px) / 2, then font-size is 24px = (16px + 32px) / 2

```CSS
.title {
  text-align: center;
  font-size: clamp(16px, calc(0.08 * 100vw), 32px);
}

```

## calc()

> calc() 此 CSS 函数允许在声明 CSS 属性值时执行一些计算

## Layout the items in a grid so that

- items have minium width of 100px and fill up the space
- place as many items in a row as possible
- gap between items is 10px

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css
.item {
  height: 50px;
  background-color: #7aa4f0;
}

.container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px, auto));
}
```

## repeat()

函数表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。

该函数可以用于 CSS Grid 属性中 grid-template-columns 和 grid-template-rows.

```css
/* <track-repeat> values */
repeat(4, 1fr)
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] 1fr [col-end])
repeat(4, [col-start] min-content [col-end])
repeat(4, [col-start] max-content [col-end])
repeat(4, [col-start] auto [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] auto [col-end])
repeat(4, [col-start] min-content [col-middle] max-content [col-end])

/* <auto-repeat> values */
repeat(auto-fill, 250px)
repeat(auto-fit, 250px)
repeat(auto-fill, [col-start] 250px [col-end])
repeat(auto-fit, [col-start] 250px [col-end])
repeat(auto-fill, [col-start] minmax(100px, 1fr) [col-end])
repeat(auto-fill, 10px [col-start] 30% [col-middle] 400px [col-end])

/* <fixed-repeat> values */
repeat(4, 250px)
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] 400px [col-end])
```

## minmax

CSS 函数 minmax()定义了一个长宽范围的闭区间， 它与 CSS 网格布局一起使用。
此函数包含两个参数，最小值 和 最大值.
  