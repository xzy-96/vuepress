---
title:
author: 净垚
date: "2022-06-07"
---
## bind

`**bind()**` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。（来源mdn）例如

```javascript
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX; 
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

这里是不是感觉和 call 差不多 只多了 一个return 一个函数

由此我们可以首先得出 bind 函数的两个特点：

1. 返回一个函数
2. 可以传入参数

## 返回一个函数

```javascript
Function.prototype.bind2 = function(obj) {
  let self = this // 本身的这个函数
  return function() {
   return self.call(obj)
  }
}
// 测试一下
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const boundGetX = unboundGetX.bind2(module);
console.log(boundGetX());  // 42

```

## 传参的模拟实现

```javascript
Function.prototype.bind2 = function(obj,...rest) {
  let self = this // 本身的这个函数
  return function(...fnRest) {
   return self.call(obj,...rest,...fnRest)
  }
}

//测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind2(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

## 构造函数效果的模拟实现

bind 还有一个特点，就是

一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子

```javascript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。

```javascript
Function.prototype.bind2 = function(obj,...rest) {
  let self = this // 本身的这个函数

   var fBound = function () {
         var bindArgs = Array.prototype.slice.call(arguments); // es5
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值

        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : obj, rest.concat(bindArgs));
    }
   // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
   fBound.prototype = this.prototype
  return fBound
}
// 测试一下
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

