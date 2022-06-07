---
title:
author: 净垚
date: "2022-06-06"
---
## bind 和 apply
`**call()**` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```
注意两点：

call 改变了 this 的指向，指向到 foo
bar 函数执行了
## 模拟实现第一步
```
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```
这个时候 this 就指向了 foo

但是这样却给 foo 对象本身添加了一个属性，这可不行呐！

不过也不用担心，我们用 delete 再删除它不就好了~

所以我们模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

以上个例子为例，就是：

```javascript
Function.prototype.call2= function(obj) {
  obj.fn = this
  obj.fn()
  delete obj.fn
}
```

## 模拟实现第二步
一开始也讲了，call 函数还能给定参数执行函数 举个例子：

```javascript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1

```

注意：传入的参数并不确定，这可咋办？

不急，我们可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里。
或者用 es6 的解构

```javascript
Function.prototype.call2= function(obj,...rest) {
  // let rest = Array.call.slice(arguments,1) 
  obj.fn = this
  obj.fn(...rest)
  delete obj.fn
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
```

## 模拟实现第三步

**1.this 参数可以传 null，当为 null 的时候，视为指向 window**

举个例子：

```javascript

var value = 1;

function bar() {
    console.log(this.value);
}

bar.call(null); // 1
```

**2.函数是可以有返回值的！**

```javascript

var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'kevin', 18));
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

所以第三版

```javascript
Function.prototype.call2= function() {
  let [obj,...rest] = arguments
  if(!obj) obj = window
  obj.fn = this
  let result =  obj.fn(...rest)
  delete obj.fn
  return result
}
// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
```

## apply的模拟实现

**`apply()`** 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数

apply 跟call 很相似

```javascript
Function.prototype.apply2= function() {
  let [obj,arr] = arguments
  if(!obj) obj = window
  obj.fn = this
  let result =  obj.fn(...arr)
  delete obj.fn
  return result
}

// 测试一下
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply2(null, numbers);

console.log(max);
```

