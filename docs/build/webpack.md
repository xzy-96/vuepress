### 按需加载

当前流行的 UI 框架如 iview,muse-ui,Element UI 都支持按需加载,只需稍微改动一下代码.

```
修改前：
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)
修改后：
import appBar from 'muse-ui/src/appBar'
import toast from 'muse-ui/src/toast'
import drawer from 'muse-ui/src/drawer'
import popup from 'muse-ui/src/popup'

Vue.component(appBar.name, appBar);
Vue.component(toast.name, toast);
Vue.component(drawer.name, drawer);
Vue.component(popup.name, popup);
```

这里有点麻烦的就是你要把整个项目用到的 muse-ui 组件都注册一遍,当然你也可以只在用到的页面做局部引用.
让我们来看看使用按需加载后的效果?

在当前项目引用了 16 个 muse-ui 组件的情况下 css 减少了 80kb,js 减少了快 200kb.

### 路由异步加载

官方文档是这么介绍的:

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单， Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。

修改 router
修改前：
import search from './components/search.vue'
{
path: '/search',
name: 'search',
component: search
}
修改后：
const search = => import('./components/search')
{
path: '/search',
name: 'search',
component: search
}

### Nginx 开启 gzip

没有使用过，仅了解

使用 cdn
打包时，把 vue、vuex、vue-router、axios 等，换用国内的 bootcdn 直接引入到根目录的 index.html。
在 webpack 设置中添加 externals，忽略不需要打包的库。

```js
module.exports = {
context: path.resolve(\_\_dirname, '../'),
entry: {
app: './src/main.js'
},
externals:{
'vue':'Vue',
'vue-router':'VueRouter',
'vuex':'Vuex'
},
```

// 格式为'aaa':'bbb'，其中，aaa 表示要引入的资源的名字，bbb 表示该模块提供给外部引用的名字，由对应的库自定。例如，vue 为 Vue，vue-router 为 VueRouter
在 index.html 中使用 cdn 引入

```js
<script src="//cdn.bootcss.com/vue/2.2.5/vue.min.js"></script>
<script src="//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
<script src="//cdn.bootcss.com/vuex/2.2.1/vuex.min.js"></script>
<script src="//cdn.bootcss.com/axios/0.15.3/axios.min.js"></script>


```

## 如何提⾼ webpack 的打包速度**?**

- 优化 Loader
  Babel 会将代码生成 ast ,ast 继续转换新的代码 项目越大 转换的代码就越大 效率就越低

  1. 优化 loader 首先可以从路径开始 通过 include 设置只找 src 下的文件 exclude 排除 node_modules 还可以将 babel 编译的文件缓存起来 下次值编译改动的文件

  ```js
  module.exports = {
    module: {
      rules: [
        {
          // js 文件才使用 babel
          test: /\.js$/,
          loader: "babel-loader?cacheDirectory=true", // 配置缓存
          // 只在 src 文件夹下查找
          include: [resolve("src")],
          // 不会去查找的路径
          exclude: /node_modules/,
        },
      ],
    },
  };
  ```

  2. HappyPack （webpack4 ） webpack5 Thread-loader
     当项目很大是 Webpack 在打包的过程中是单线程的速度就会很慢 HappyPack 是多线程打包 它 可以将 Loader 的同步执行转换为并行的
     但是 现在作者没有维护了
     webpack5 官网推出了 Thread-loader 跟 HappyPack 类似

  3. DllPlugin
     DllPlugin 可以将 特定的库提前打包引入 这样就减少了打包次数 比如 你用了 vue 他一般我们是不会更新的

  ```js
  // 单独配置在一个文件中
  // webpack.dll.conf.js
  const path = require("path");
  const webpack = require("webpack");
  module.exports = {
    entry: {
      // 想统一打包的类库
      vendor: ["react"],
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].dll.js",
      library: "[name]-[hash]",
    },
    plugins: [
      new webpack.DllPlugin({
        // name 必须和 output.library 一致
        name: "[name]-[hash]",
        // 该属性需要与 DllReferencePlugin 中一致
        context: __dirname,
        path: path.join(__dirname, "dist", "[name]-manifest.json"),
      }),
    ],
  };
  ```

然后需要执行这个配置文件生成依赖文件，接下来需要使用 DllReferencePlugin 将依赖文件引入项目中

```js
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require("./dist/vendor-manifest.json"),
    }),
  ],
};
```

3. 代码压缩

在 Webpack3 中，一般使用 UglifyJS 来压缩代码，但是这个是单线程运行的，为了加快效率，可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率
在 Webpack4 中，不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能。
