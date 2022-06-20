---
title: 策略模式
author: 净垚
date: "2022-06-20"
---

定义一系列算法 把他们一个个封装起来，并且使他们可以互相替换

### 使用策略模式计算奖金

```js
var caluclateBonus = function(performaceLevel,salary) {
    if(performaceLevel === "S") {
        return salary *(1+1) 
    }else if(performaceLevel === "A") {
        return salary * (1+0.5)
    }(performaceLevel === "B") {
        return salary * (1+0.2)
    }
}
```

可以发现，这段代码存在 显而易见的问题

caluclateBonus函数比较庞大，包含很多if-else ,缺乏弹性 如果要加等级C 那我们必须深入函数内部实现

### 使用策略模式重构  

```js

function perfromanceS(salary) {
   
}

function perfromanceA(salary) {
  
}
function perfromanceB(salary) {
   
}
perfromanceS.prototype.calculate = function(salary) {
    return salary *(1+1) 
}
perfromanceA.prototype.calculate = function(salary) {
    return salary *(1+0.5) 
}
perfromanceB.prototype.calculate = function(salary) {
    return salary *(1+0.2) 
}

function Bonus() {
    this.salary = null; // 原始工资
    this.strategy = null // 绩效等级对应的策略对象
}
Bonus.prototype.setSalary =function (salary) {
    this.salary = salary
}

Bonus.prototype.setStrategy =function (strategy) {
    this.strategy = strategy
}

Bonus.prototype.getBonus =function () {
   return this.strategy.calculate(this.salary)
}

var bouns = new Bonus()
bouns.setSalary(10000)
bouns.setStrategy(new perfromanceS())
```

可以看到通过策略模式重构之后 代码更加清晰 但是这段代码是基于传统的面向对象语言 模仿的 

### javascirpt版

```js
var strategies = {
	"S":function() {
		return salary *(1+1)
	},
	"A": function() {
		return salary *(1+0.5)
	},
	"B": function() {
		return salary *(1+0.2)
	},
}

var calculateBonus = function(level,salary) {
	return strategies[level](salary)
}
calculateBonus("S",10000)
// 加C等级
strategies.C = function() {
		return salary *1
}
```

