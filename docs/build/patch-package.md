---
title:
author: 净垚
date: "2022-05-31"
---

## patch-package

- 工作中发现 element-plus 有 bug ,然后时间又紧，想自己改好然后就去 改 node_modules 里的源码 ，但改了源码 其他人就用不了 这时候我们的主角登场了 patch-package

### 安装

```

# npm
npm install patch-package --save-dev

# yarn
yarn add --dev patch-package postinstall-postinstall

```

### 创建补丁

直接在项目根目录下的 node_modules 文件夹中找到要修改依赖包的相关文件，然后回到根目录执行

```
npx patch-package element-plus
```

执行完成后，会在项目根目录的 patches 目录中创建补丁文件 element-plus+0.44.0.patch（0.44.0 是依赖包版本），这个补丁需要提交到代码仓库中
