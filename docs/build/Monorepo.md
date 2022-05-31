---
title:
author: 净垚
date: "2022-05-31"
---

## Monorepo

Monorepo 是管理项目代码的方式之一，指在一个大的项目仓库（repo）中 管理多个模块/包（package），这种类型的项目大都在项目根目录下有一个 packages 文件夹，分多个项目管理。大概结构如下：

```
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

- Monorepo 的好处在哪里嘞？

1. `统一管理` 比如微前端项目，多个子应用可以放在同一个 monorepo 中方便管理；后端用 node.js 的项目放在 monorepo 中也可以使用同一套技术栈管理。在 CI/CD 等流水线过程中，方便统一迭代或升级版本，也方便做通用化的配置，适用到多个子项目当中。
2. `依赖提升。`如果多个项目都依赖了诸如 react、vue 或 TypeScript 等常用库，那可以通过 lerna 或者 yarn workspace 将依赖提升到最外层，多个子模块/包复用同一个依赖，减小项目体积

- 如何实现 Monorepo

1.  pnpm
2.  lerna
3.  等等

## pnpm

包管理工具

### 快速开始

先全局安装一个 pnpm，然后通过：

```
pnpm init
```

创建一个项目——在本例中，我们实现一个前后端分离、共同管理的 demo。

首先，我们需要理解 pnpm 中的工作区，在 pnpm 中可以通过创建并配置 pnpm-workspace.yaml 设置 workspace：

```
packages:
  - 'packages/**'
```

接下来，我们就按照配置，创建 packages 文件夹，并在其目录中创建三个子项目，分别是：web 端、server 端和 http。

```

├── packages
│   ├── server
│   ├── http
│   └── web
```

### 全局依赖

- 我们知道不管是一个 web 项目还是一个 server 项目，它都是基于同一种语言编写，所以我们可以只安装一次 TypeScript，供三个项目使用，这就体现出了 monorepo 的优势。

```
pnpm install typescript // × 会报错问你是不是需要安装到根目录的文件，需要的话使用-w(--workspace-root)
pnpm install typescript -D √
pnpm install typescript -D -w √
```

这里的-D 指令，就是把依赖作为 devDependencies 安装；而-W 就是把依赖安装到根目录的 node_modules 当中

### 安装局部依赖

参照 pnpm 官网提供了根目录执行的命令 首先切到指定包 http 进行`pnpm init`初始化,包名一般都通用为命名空间+项目名，这里命名为@monorepo/http,必须要命名，不然 pnpm add --filter 的时候找不到添加包的项目目录
对于局部依赖，最简单的办法就是 cd packages/http

```
pnpm install axios
```

但这样重复操作多次未免有些麻烦，pnpm 提供了一个快捷指令——filter
比如我们只在 web 应用中用到 vue，那就可以为它单独安装。首先要拿到它的 package name，这个是我们在子项目中自定义的，通常是”@命名空间+包名@“的方式，比如@vite/xx 或@babel/xx，在本例中，我们都以@panda 开头。那么命令如下：

```
pnpm install vue -r --filter @monorepo/web
```

### link 机制

在 monorepo 中，我们往往需要 package 间的引用，比如本例中的@monorepo/http 就会被@monorepo/server 和@monorepo/web 依赖。

```
pnpm i @monorepo/http -r --filter @monorepo/server @monorepo/web
```

在执行前，我们可以添加一个函数，比如：

```
// http/index.ts
export const getNow = () => (new Date().getTime());
```

```
// server/index.ts
import { getNow } from "@monorepo/http";

console.log(getNow());

```
