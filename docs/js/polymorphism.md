---
title: 多态
author: 净垚
date: "2022-06-18"
---
同一操作作用于不同对象上面 可以产生不同的的解释和不同的结果。换句话说，给不同的对象发送同一消息，得到不同的反馈
下面举例说明

农夫养了两只动物，分别是鸭和鸡，当主人向他们发去”叫“的命令是 鸭会”嘎嘎嘎“ 鸡会 ”咯咯咯“ 这两只动物 都会一自己的方式来发出声音。他们同样是“动物，并且发出叫声”，

下面通过代码进行介绍

```javascript
var makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log("嘎嘎嘎")
    }else if(animal instanceof Chicken) {
        console.log("咯咯咯")
    }
}
function Duck() {
    
}
function Chicken() {
    
}
makeSound(new Duck()) // 嘎嘎嘎
makeSound(new Chicken()) // 咯咯咯
```

这段代码确实体现了 “多态性” 但这样是无法让人满意的 如果 有新来一个动物 此时我们必须改 makeSound函数 才能让狗发出叫声 修改代码是有危险的 修改的越多程序出错的可能新就越大，而动物越多 makeSound 就有可能变成一个巨大函数

下面是改写后的代码 首先我们把不变的部分隔离出来 那就是所有的动物都会叫

```javascript
var makeSound = function(animal) {
   animal.sound()
}

```

然后把可变的部分各种封装起来 

```js
function Duck() {
    
}
Duck.prototype.sound = function() {
    console.log("嘎嘎嘎")
}
function Chicken() {
    
}
Chicken.prototype.sound = function() {
    console.log("咯咯咯")
}
```

