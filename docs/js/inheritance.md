---
title: 继承
author: 净垚
date: "2022-06-20"
---

对象之间的"继承"的五种方法。

比如，现在有一个"动物"对象的构造函数。

```js
function Animal() {
    this.species = "动物";
}
```

还有一个"猫"对象的构造函数。

```js

　　function Cat(name,color){

　　　　this.name = name;

　　　　this.color = color;

　　}
```

怎样才能使"猫"继承"动物"呢？

## **构造函数绑定**

第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：

```js
　　function Cat(name,color){

　　　　Animal.apply(this, arguments); // this.species = "动物";
		
　　　　this.name = name;

　　　　this.color = color;

　　}

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```

##  **prototype模式**

如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。

```
function Animal() {
    this.species = "动物";
}
function Cat(name,color){

	this.name = name;

	this.color = color;

}
Cat.prototype = new Animal() // 每个函数 都有原型链 原型的constructor 都会指向自己 这里原型链改了之后就指向了 Animal
Cat.prototype.constructor = Cat; // 所以通过 .的方式重新指向 CatAnimal.prototype.constructor会指向 Cat

```

 ## **直接继承prototype**

第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

现在，我们先将Animal对象改写：

```
　　function Animal(){ }

　　Animal.prototype.species = "动物";
　　//然后，将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。
　　Cat.prototype = Animal.prototype;

　　Cat.prototype.constructor = Cat;

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

```
　Cat.prototype.constructor = Cat;
```

这一句实际上把**Animal.prototype**对象的constructor属性也改掉了！

```
　alert(Animal.prototype.constructor); // Cat
```

## **利用空对象作为中介**

由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。

```js
　　var F = function(){};

　　F.prototype = Animal.prototype;

　　Cat.prototype = new F();

　　Cat.prototype.constructor = Cat;
```

F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象

我们将上面的方法，封装成一个函数，便于使用。

```
　　function extend(Child, Parent) {

　　　　var F = function(){};

　　　　F.prototype = Parent.prototype;

　　　　Child.prototype = new F();

　　　　Child.prototype.constructor = Child;

　　　　Child.uber = Parent.prototype;

　　}
```

使用的时候，方法如下

```js
　　extend(Cat,Animal);

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```

这个extend函数，就是YUI库如何实现继承的方法。

另外，说明一点，函数体最后一行



> ```js
> 　Child.uber = Parent.prototype;
> ```

意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

## **拷贝继承**

```
function Animal(){}

Animal.prototype.species = "动物";
function extend2(Child, Parent) {

    var p = Parent.prototype;

    var c = Child.prototype;

    for (var i in p) { // fo in 会遍历原型上的属性

      c[i] = p[i];

      }

    c.uber = p;

}
　　
```

[来源](https://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
