---
title: js基础
author: 净垚
date: "2022-07-06"
---

## JavaScript 有哪些数据类型，它们的区别？

null string boolean number object undefined symbol bigint

symbol bigint 是 es6 新增的

- symbol 是唯一 主要是解决全局变量 冲突问题
- bigint 是 数字类型数据 它表示任意精度格式的整数

这些数据分为 引用类型数据 和值类型数据

栈：值类型数据 （string number boolean undefined null symbol bigint）
堆：引用类型数据 （array object function）

## 数据类型检测的方式有哪些

- typeof
  typeof 不能检查出 null array 构造函数

- instanceof
  instanceof 可以判断对象的类型 但是不能判断 原始类型（值类型） 其内部机制是找到原型链上的类型
  本质

```js
var a = {};
a instanceof Object; // 他是等于下面的
a.__proto__ == Object.prototype;
```

- constructor

```
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
他本质也是 调用(2).__proto__.constructor === Number  //找不到去原型链上找
```

- Object.prototype.toString.call()
  1. 同样是 toString 方法 为啥会不一样
  2. 那是因为 Array Function 他们都重写了 toString 方法

## 判断数组的方式有哪些

- Object.prototype.toString.call()
- Array.isArray
- 原型链判断
- isPrototypeOf

## null 和 undefined 区别

null 表示空对象
undefined 表示未定义

## typeof null 的结果是什么，为什么？

在第一版 js 里面， 所有值都存在 32 个单位里面 每个单位有 小的类型标签（1-3）字节组成
而对象 标签类型 是 000 但 null 是全部都是 0 所以 typeof null 就是 object 了

## intanceof 操作符的实现原理及实现

```js
function instanceof2(left, right) {
  // 1. 判断是否和left原型相等
  // 2. 不想等就取原型的原型 直到去到原型
  let rightP = right.prototype;
  let left_ = left.__proto__;

  while (true) {
    if (!rightP) return false;
    if (left_ == rightP) return true;

    rightP = rightP.prototype;
  }
}
```

## 为什么 0.1+0.2 ! == 0.3，如何让其相等

1. 变成整数相加
2. toFixed

## 如何获取安全的 undefined 值？

因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值 表达式 void 没有返回值 就可以表示为 undefined

## typeof NaN 的结果是什么？

NaN 是一个特殊值 自身不等于自身
isNaN 和 Number.isNaN 函数的区别？

```js
isNaN({}); // true
```

isNaN 会先尝试把参数转换会数字 转换不了的值 输出为 true
Number.isNaN 是先判断是否为数字 在判断是否 NaN 不会转化

## == 操作符的强制类型转换规则？

对于类型不一样的就会进行 类型转换
判断规则

1. 类型是否相同 相同就判断大小值
2. 类型不同 就会类型转换
3. 先会判断是否为 null 和 undefined ,是的话就是 true
4. 判断是否为 string 和 number 是的话就会转成 number

```js
1 == "1";
会变成;
1 == Number("1");
```

5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断

```js
"1" == true;
"1" == 1;
1 == 1;
```

6. 判断是否为 object 是的话 就调用 toString 方法

```js
"1" == { name: 1 }; // 调用 toString 方法
"1" == "[object Object]";
```

## 其他值到字符串的转换规则？

number 极大会加指数
object 会调用 toString()
其他都是 加双引号

## 其他值到数字值的转换规则？

- undefined，字符串 转 会成 NaN
- null 会转成 0
- Symbol 类型的值不能转换为数字，会报错。
- 对象 会先转成 基本类型（toString），如果不是数字 就会安字符串来转

## 其他值到布尔类型的值的转换规则？

除了假值 会转成 false 其余都是 true

假值

- undefined
- null
- 0 -0 +0
- ''

## 18. JavaScript 中如何进行隐式类型转换

- 当要转的对象为 number 时

1.  先调用 valueof 如果为原始值 则返回
2.  否则再调用 toString 如果为原始值 则返回
3.  否则 抛出异常 'typeError'

- 当要转的对象为 string 时

1.  先调用 toString 如果为原始值 则返回
2.  否则再调用 valueof 如果为原始值 则返回
3.  否则 抛出异常 'typeError'

除了 date 对象 是 string 其他都是 Number

### + 操作符

只要有一边是字符串 两边都会转换成 string 类型其他情况下两边的变量都会被转换为数字。

```js
1 + "2"; // '12'
"1" + 2; // '12'

Symbol() + 1; // 报错 不能隐式转换
Symbol() + "1"; // 报错 不能隐式转换

Number(Symbol()); // 报错 不能转换成数字
String(Symbol()); // 'Symbol()'
```
