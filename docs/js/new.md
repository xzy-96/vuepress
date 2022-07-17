---
title: new
author: 净垚
date: "2022-07-17"
---

`**new**` 生成一个对象

```


function Bar(name) {
  this.name = name
}


var bar = new Bar('我是bar')
// Bar {name:'我是bar'}
 bar instantof Bar // true
```

注意三点：

- name 的值会 在这个对象上
- 他的隐式原型会指向构造函数的原型
- bar 函数执行了

## 模拟实现第一版

```js
function objectFactory(fn, ...rest) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  fn.apply(obj, rest);
  return obj;
}

// 测试一下
function Bar(name) {
  this.name = name;
}

var bar = objectFactory(Bar, "我是bar");
```

我们在用 new 的时候 构造函数返回了 一个引用类型 这时候值又是不一样的

## 模拟实现第二版

```js
function objectFactory(fn, ...rest) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, rest);
  return typeof result === "object" ? result : obj;
}

// 测试一下
function Bar(name) {
  this.name = name;
  return {
    otherObj: "新的对象",
  };
}
var obar = new Bar("我是bar");
var bar = objectFactory(Bar, "我是bar");
```

这样一个简单的 new 就实现了 但是还有边界没有处理

## 模拟实现第三版

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
```
