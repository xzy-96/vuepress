---
title:
author: 净垚
date: "2022-06-13"
---
## debounce
防抖的原理: 在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准
## 为什么要debounce
在前端开发中会遇到一些频繁的事件触发，比如：
1. window 的 resize、scroll
2. mousedown、mousemove
3. keyup、keydown
4. ……

 举个例子
```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>debounce</title>
    <style>
      #container {
        width: 100%;
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        background-color: #444;
        font-size: 30px;
      }
    </style>
  </head>

  <body>
    <div id="container"></div>
    <script src="debounce.js"></script>
  </body>
</html>

```
debounce.js 文件的代码如下：
```javascript
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    container.innerHTML = count++;
    console.log(this,e) // container element 和 event
};

container.onmousemove = getUserAction;
```
鼠标滑动就会一直触发

### 第一版
```javascript
function debounce(fn,wait) {
  var timeout
  return function() {
    console.log(this) // container element 
    clearTimeout(timeout)
    timeout =  setTimeout(fn, wait);
  }
}
container.onmousemove =debounce(getUserAction,1000) ;
```
但是 getUserAction 的this是window

### 第二版 this

```javascript
function debounce(fn,wait) {
  var timeout
  return function() {
    console.log(this) // container element 
    clearTimeout(timeout)
    timeout =  setTimeout(fn.bind(this), wait);
  }
}
container.onmousemove =debounce(getUserAction,1000) ;
```

### event 对象

```javascript
function debounce(fn,wait) {
  var timeout
  return function() {
    console.log(this) // container element 
    if (timeout) clearTimeout(timeout)
    timeout =  setTimeout(fn.bind(this,arguments), wait);
  }
}
container.onmousemove =debounce(getUserAction,1000) ;
```


### 立即执行

```javascript
function debounce(fn,wait,immediate) {
  var timeout
  
  return function() {
    console.log(this) // container element 
    if (timeout) clearTimeout(timeout)
    if(immediate){
      // 如果已经执行过，不再执行
      var callNow = !timeout; // timeout 会是数字 只有setTimeout 执行了 才能再次调用fn 
      timeout = setTimeout(function() {
        timeout = null
      },wait)
      if(callNow) fn.apply(this,arguments)
    }else{
      timeout =  setTimeout(fn.bind(this,arguments), wait);
    }
    
  }
}
container.onmousemove =debounce(getUserAction,1000,true) ;
```