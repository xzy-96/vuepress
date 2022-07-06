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
