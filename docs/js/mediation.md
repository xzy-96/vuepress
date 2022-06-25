---
title: 中介模式
author: 净垚
date: "2022-06-2"
---
泡泡堂
在游戏之初只有只支持两个玩家同时进行对战
先定义玩家构造函数，它有3个简单的原型方法 win lose die
```js
function Player(name) {
  this.name = name
  this.enemy = null
}

Player.prototype.win = function() {
  console.log(this.name + 'win')
}
Player.prototype.lose = function() {
  console.log(this.name + 'lose')
}
Player.prototype.die = function() {
  this.lose()
  this.enemy.win()
}
```
接下来创建 两个玩家
```js
var player1 = new Player('小明')
var player2 = new Player('小喵')
```
给玩家创建敌人
```js
player1.enemy = player2
player2.enemy = player1
```
当玩家player1 被炸死的时候 
```
player1.die() // 小明lose 小喵win
```
两个玩家其实并没有什么意思 真正的泡泡堂可以有 8个玩家 并分红蓝队
所以我们定义一个数组players来保存所有的玩家 在创建玩家之后 循环players 来给每个玩家设置队友和敌人

```js
var players = []; // 保存所有玩家
function Player(name, teamColor) {
  this.partners = []; // 队友列表
  this.enemise = []; // 敌人列表
  this.state = "live"; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor;
}

Player.prototype.win = function () {
  console.log("winner" + this.name);
};
Player.prototype.lose = function () {
  console.log("loseer" + this.name);
};

Player.prototype.die = function () {
  var all_dead = true;
  this.state = "dead";
  debugger;
  for (var i = 0, partners; (partners = this.partners[i++]); ) {
    if (partners.state !== "dead") {
      all_dead = false;
      break;
    }
  }

  if (all_dead === true) {
    this.lose();
    for (var i = 0, partners; (partners = this.partners[i++]); ) {
      partners.lose();
    }
    for (var i = 0, enemise; (enemise = this.enemise[i++]); ) {
      enemise.win();
    }
  }
};
// 定义一个工厂来创建玩家
var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  for (var i = 0, player; (player = players[i++]); ) {
    if (player.teamColor == newPlayer.teamColor) {
      player.partners.push(newPlayer); // 互相添加队友
      newPlayer.partners.push(player);
    } else {
      player.enemise.push(newPlayer); // 互相添加敌人
      newPlayer.enemise.push(player);
    }
  }
  players.push(newPlayer);
  return newPlayer;
};

var player1 = playerFactory("皮蛋", "red");
var player2 = playerFactory("小明", "red");
var player3 = playerFactory("小红", "red");
var player4 = playerFactory("小强", "red");
var player5 = playerFactory("黑妞", "blue");
var player6 = playerFactory("蒜头", "blue");
var player7 = playerFactory("胖对", "blue");
var player8 = playerFactory("傻子", "blue");

player1.die();
player2.die();
player3.die();
player4.die();


```

这个例子 只创建了 8个玩家，但真正的游戏有很多玩家
我们用中介者的模式来改造
首先定义Player构造函数和player的原型方法，在player不再负责具体的执行逻辑，而是把操作交给中介者对象playerDirector
```js

function Player(name, teamColor) {
  this.state = "live"; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor;
}

Player.prototype.win = function () {
  console.log("winner" + this.name);
};
Player.prototype.lose = function () {
  console.log("loseer" + this.name);
};

Player.prototype.die = function() {
  this.state = 'dead'
  playerDirector.reciveMessage('playerDead',this)
}

Player.prototype.remove = function() {

  playerDirector.reciveMessage('removePlayer',this)
}
Player.prototype.changeTeam = function(color) {

  playerDirector.reciveMessage('changeTeam',this,color)
}

var playerFactory = function(name,teamColor) {
  var newPlayer = new Player(name,teamColor)
  playerDirector.reciveMessage('addPlayer',newPlayer)
  return newPlayer
}
```
接下来就是实现playerDirector对象了
```js
var playerDirector = (function(){
  var players = {}, // 保存所有玩家
      operations = {} // 中介者可以执行的操作
      operations.addPlayer = function(player) {
        var teamColor = player.teamColor
        players[teamColor] = players[teamColor] || []
        //添加玩家
        players[teamColor].push(player)
      }
      operations.removePlayer = function(player) {
        var teamColor = player.teamColor
        // 同队伍的
        teamPlayers = players[teamColor] || []
        deletePlayer(teamPlayers,player)
      }

       operations.changeTeam = function(player,newTeamColor) {
        operations.removePlayer(player)
        player.teamColor = newTeamColor
        operations.addPlayer(player)
      }

      operations.playerDead = function(player,newTeamColor) {
        var teamColor = player.teamColor
        // 同队伍的
        teamPlayers = players[teamColor]
        var all_dead = true
        for(var i =0,player;player=teamPlayers[i++];) {
          if(player.state !== 'dead') {
            all_dead = false
            break
          }
        }
        if(all_dead) { //所有的队友都死了
           for(var i =0,player;player=teamPlayers[i++];) {
            player.lose()
           }
            for(var color in players) {
              if(color !== teamColor) {
                var otherTeamPlayers = players[color]
                 for(var i =0,ohterPlayer;ohterPlayer=otherTeamPlayers[i++];) {
                  ohterPlayer.win()
                }
              }
           
           }
        }
      }
      var reciveMessage = function() {
        var message = Array.prototype.shift.call(arguments)
        operations[message].apply(this,arguments)
      }
      return {
        reciveMessage
      }
})()

function deletePlayer(playerList,player) {
  for(var i=playerList.length;i>=0;i--) {
    if(playerList[i] === player) {
      playerList.splice(i,1)
      return
    }
  }
}

// 测试一下
var player1 = playerFactory("皮蛋", "red");
var player2 = playerFactory("小明", "red");
var player3 = playerFactory("小红", "red");
var player4 = playerFactory("小强", "red");
var player5 = playerFactory("黑妞", "blue");
var player6 = playerFactory("蒜头", "blue");
var player7 = playerFactory("胖对", "blue");
var player8 = playerFactory("傻子", "blue");

player1.die();
player2.die();
player3.die();
player4.die();
  // index.html:21 loseer小明
      // index.html:21 loseer小红
      // index.html:21 loseer小强
      // index.html:18 winner黑妞
      // index.html:18 winner蒜头
      // index.html:18 winner胖对
      // index.html:18 winner傻子
```