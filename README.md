# yinchengnuo-admin-ui 项目文档
---

本项目为使用 Vue 全家桶及 ElementUI 开发的 SPA。同时参考了多个成熟的企业级中后台产品解决方案，包括但不仅限于 vue-element-admin 、layUI 等。在结合这些方案的同时，对大部分主要功能进行了扩充和重构，不仅使得功能实现更为优雅，也更易维护和拓展。同时增加汇总了可配置项，并对演示部分和业务部分做了抽离，使得可以在此基础上快速优雅的搭建企业级中后台产品原型。并且本项目使用了最新的前端技术栈，内置了动态路由，权限验证等，同时保证了实用性和技术性。

### 前序准备

需要在本地安装 node 和 git。本项目技术栈基于 ES2015+、vue、vuex、vue-router、vue-cli、axios 和 element-ui，所有的请求数据都使用 Mock.js 进行模拟。

### 安装

```bash
# 克隆项目
git clone https://github.com/yinchengnuo/yinchengnuo-admin-ui

# 进入项目目录
cd yinchengnuo-admin-ui

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```

### 项目目录

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
- build // 项目预构建配置
    - index.js // 项目预览/分析构建文件体积配置（相关命令见：package.json）
    - clearSvg.js // 检查/清除 icon 文件夹下无用的 svg（相关命令见：package.json）
- mock // 数据接口模拟
    - apis // 接口
      index.js // 接口整合
      server.js // 接口挂载服务
      utils.js // 接口处理工具方法
- plop-templates // plop 快速新建模板
    - component // 组件模板
    - store // vuex module 模板
    - view // 页面模板
- public // 公共文件目录
      index.html // 页面
      favicon.ico // ico
- src // 项目源码
    - api // 接口
    - assets // 静态资源
    - components // 组件
    - icons // 图标
    - layout // 布局
    - plugin // 全局 指令、过滤器、对象
    - router // 路由
    - store // vuex
    - styles // 样式
    - util // 工具
    - vendor // 第三方工具库
    - views // 所有业务页面
    - views-constant // 所有的公共页面
    - views-ui-template // 所有的UI模板页面
      App.vue // 根组件
      main.js // 项目入口文件
      permission.js // 权限控制
      setting.js // 初始设置
  test // 测试工具文件目录
  .editorconfig // vscode 配置
  .env.development // 开发环境参数
  .env.production // 生产环境参数
  .env.staging // 预发布环境参数
  .eslintignore // eslint 生效文件夹配置
  .eslintrc.js // eslint 配置
  .gitignore // git 配置
  .travis.yml // 自动化 CI 配置
  babel.config.js // babel 配置
  jest.config.js // jest 配置
  jsconfig.json // js 根目录配置
  package.json // node 包信息
  package-lock.json // node 包依赖信息
  plopfile.js // plop 配置
  postcss.config.js // postcss 配置
  README.md // README.md
  vue.config.js // vue-cli 配置
```

### 快速开始

将 **/src/settings.js** 中 showUI 参数设置为 false 即可隐藏所有示例 UI 模板页面开始快速开发。或者你也可以在 **/src/router** 中移除相应路由。

---

## 1、布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

![](https://panjiachen.gitee.io/gitee-cdn/vue-element-admin-site/7066d74f-12c5-47d6-b6ad-f22b43fec917.png)

对应的代码在 layout 文件夹下。而 yinchengnuo-admin-ui 中大部分页面都是基于这个 layout 的，除了个别页面如：login , 404, 401 等页面没有使用该 layout。如果你想在一个项目中有多种不同的 layout 也是很方便的，只要在一级路由那里选择不同的 layout 组件就行。

```js
// 没有使用 layout
{
    path: '/401',
    component: () => import('errorPage/401')
}
// 使用了 layout
{
    path: '/document',
    component: Layout, // 你可以选择不同的layout组件
    children: [
        {
            path: 'index',
            name: 'Document',
            component: () => import('document/index')
        }
    ]
}
```

这里使用了 vue-router 路由嵌套, 所以一般情况下，你增加或者修改页面只会影响 app-main 这个主体区域。其它配置在 layout 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化的。

```
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

当然你也可以一个项目里面使用多个不同的 layout，只要在你想作用的路由父级上引用它就可以了。

### app-main
---

**对应代码: /src/layout/components/AppMain.vue**

这里在 app-main 外部包了一层 keep-alive 主要是为了缓存 router-view 的，配合页面的 tabs-view 标签导航使用，如不需要可自行去除(详细见下方：快捷标签)。

其中 transition 定义了页面之间切换动画，可以根据自己的需求，自行修改转场动画。默认提供了fade 和 fade-transform 两个转场动画，具体 css 实现见 /src/styles/transition.scss。如果需要调整可在 AppMain.vue 中调整 transition 的 name。

### portal
---

**对应代码: /src/layout/components/AppMain.vue**

通常情况下，我们只需要将页面渲染至 layout 中 app-main 的 router-view 就好。这样渲染出来的页面都会默认带有 layout 布局。但是有些时候，我们想要页面可以控制 layout 的显示/隐藏。比如在项目文档页面，当我们调用 window.print() 希望将当前页面的文档部分打印时，就自然不希望把布局也打印上，因此就需要一种方式去控制 layout 的显示隐藏。但是实际上文档还存在于 layout 中，layout 隐藏，文档自然也会隐藏。因此其实我们要做的就是将 layout 隐藏的同时，将文档部分渲染到 layout 以外。即触发某种情况，将子组件渲染到父组件以外的地方。

这里使用了 portal-vue 库来实现了类似 React 中的 portal 功能。同时使用 vuex 共享状态。具体使用不再赘述。需要注意的是，触发 portal 的子组件在渲染至父组件以外的地方时，会重新从头执行组件内的生命周期函数。原理是 portal-vue 从 Virtual DOM 层面改变了 dom 结构。同时 portal 功能将会在 Vue3.x 后提供官方支持。

最后你也可以通过操作真实 dom 的方式将子组件移到父组件外部，但是强烈不推荐。

### 移动端
---

yinchengnuo-admin-ui 对自己的定位是桌面端后台框架，而且对于管理后台这种重交互的项目来说是不能通过简单的适配来满足桌面端和移动端两端不同的交互，所以真要做移动版后台，建议重新做一套系统。

所以本项目也不会适配移动端，只是用 media query 做了一点简单的响应式布局，有需求请自行修改。

## 2、路由和侧边栏

路由和侧边栏是组织起一个后台应用的关键骨架。

本项目侧边栏和路由是绑定在一起的，所以你只要在 /src/router/index.js 下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动重复编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

### 配置项
---

首先我们了解一下本项目配置路由时提供了哪些配置项。

```js
hidden: true // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面 /edit/1(默认 false)
redirect: 'noRedirect' //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题

meta: {
    title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true // 若果设置为true，它则会固定在tags-view中(默认 false)
    target: '_blank' // 路由是否在新的页面打开，打开后默认没有 layout
    layout: false // 路由是否在新的页面后是否有 layout

    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu: '/article/list'
}
```

**示例：**

```js
{
    path: '/permission',
    component: Layout,
    redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
    hidden: true, // 不在侧边栏线上
    alwaysShow: true, //一直显示根路由
    children: [{
        path: 'index',
        component: ()=>import('permission/index'),
        name: 'permission',
        meta: {
            title: 'permission',
            icon: 'lock', //图标
            noCache: true // 不会被 <keep-alive> 缓存
        }
    }]
}
```

### 路由
---

这里的路由分为两种，constantRoutes 和 asyncRoutes。

**constantRoutes：** 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

**asyncRoutes：** 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。

具体的会在 下一部分（权限验证）介绍。

其它的配置和 vue-router 官方并没有区别，自行查看文档。

如果这里有一个需要非常注意的地方就是 404 页面一定要最后加载，如果放在 constantRoutes 一同声明了 404 ，后面的所以页面都会被拦截到404。

### 侧边栏
---

本项目侧边栏主要基于 element-ui 的 el-menu 改造。

前面也介绍了，侧边栏是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。

**对应代码: /src/layout/components/Sidebar**

这里同时也改造了 element-ui 默认侧边栏不少的样式，所有的 css 都可以在 **/src/styles/sidebar.scss** 中找到，你也可以根据自己的需求进行修改。

这里需要注意一下，一般侧边栏有两种形式即：submenu 和 直接 el-menu-item。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：

![](https://panjiachen.gitee.io/gitee-cdn/vue-element-admin-site/e94739d6-d701-45c8-8c6e-0f4bb10c3b46.png)

在 Sidebar 中已经帮你做了判断，当你一个路由下面的 children 声明的路由大于>1 个时，自动会变成嵌套的模式。如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中。若不想这样，可以通过设置在根路由中设置 alwaysShow: true 来取消这一特性。

你可以在 **/src/layout/components/Sidebar/index.vue** 中设置 unique-opened 来控制侧边栏，是否只保持一个子菜单的展开。

### 多级目录(嵌套路由)
---

如果你的路由是多级目录，有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个 <router-view>。

```html
<template>
  <router-view />
</template>
```

如：**/src/views/components/editor**。原则上有多少级路由嵌套就需要多少个。

### 点击侧边栏 刷新当前路由
---

在用 spa(单页面应用) 这种开发模式之前，用户每次点击侧边栏都会重新请求这个页面，用户渐渐养成了点击侧边栏当前路由来刷新 view 的习惯。但现在 spa 就不一样了，用户点击当前高亮的路由并不会刷新 view，因为 vue-router 会拦截你的路由，它判断你的 url 并没有任何变化，所以它不会触发任何钩子或者是 view 的变化。

社区也对该问题展开了激烈讨论。尤大本来也说要增加一个方法来强刷 view，但后来他又改变了心意/(ㄒ o ㄒ)/~~。但需求就摆在这里，我们该怎么办呢？他说了不改变 current URL 就不会触发任何东西，那我可不可以强行触发你的 hook 呢？上有政策， 下有对策我们变着花来 hack。方法也很简单，通过一个中间页面作为过渡。判断当前点击的菜单路由和当前的路由是否一致，但一致的时候，会先跳转到一个专门 Redirect 的页面，它会将路由重定向到我想去的页面，这样就起到了刷新的效果了。

```js
refresh(name) { // 点击侧边栏刷新页面
    if (this.$route.name === name) {
        this.$router.replace({
            path: '/redirect' + this.$route.fullPath
        })
    }
}
```

### 面包屑
---

本项目中也封装了一个面包屑导航，它也是通过 watch $route 变化动态生成的。它和 menu 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。大家也可以结合自己的业务需求增改这些自定义属性。比如可以在路由中声明 breadcrumb:false ，让其不在 breadcrumb 面包屑显示。

### 侧边栏滚动问题
---

之前版本的滚动都是用 css 来做处理的

```css
overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}
```

首先这样写会有兼容性问题，在火狐或者其它低版本浏览器中都会比较不美观。其次在侧边栏收起的情况下，受限于 element-ui 的 menu 组件的实现方式，不能使用该方式来处理。

所以现版本中使用了 el-scrollbar 来处理侧边栏滚动问题。

### 侧边栏 外链
---

你也可以在侧边栏中配置一个外链，只要你在 path 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

### 侧边栏默认展开
---

可以通过 default-openeds 来进行设置。**/src/layout/components/Sidebar/index.vue**。需要注意的是 :default-openeds="['/example','/nested']" 里面填写的是 submenu 的 route-path。

## 3、权限验证

本项目中权限的实现方式是：通过获取当前用户的保存在服务端的路由表，生成当前用户具的权限可访问的路由表，通过 router.addRoutes 动态挂载到 router 上。

### 基本逻辑
---

本项目通过 **角色管理** 和 **账号管理** 动态管理后台管理员的权限。其中角色绑定权限、账号绑定角色。一个角色可以对应多个账号，但一个账号只能由一个角色。其中默认掌握系统所有权限的角色是唯一的且只能角色名为 **root**。同样 **root** 也可以有多个账号。前端代码中会判断用户的角色名为 **root** 时，自动挂载所有的路由。因此 **root** 角色在服务端没有路由表，即为 null。同时 **root** 角色添加角色可选择的权限即为所有权限，**root** 角色可以在角色管理添加新的角色，通过选择权限 Tree 上的内容分配权限，提交后，保存在后端的是一个简化的路由表：

```json
[
  {
    "path": "/components",
    "children": [
      {
        "path": "button-auth",
        "buttons": [
          "del",
          "edit",
          "search"
        ]
      }
    ]
  },
  {
    "path": "/admin",
    "children": [
      {
        "path": "role"
      },
      {
        "path": "user"
      }
    ]
  }
]
```

通过上一节 **路由和侧边栏** 我们知道。vue-router 单个路由配置项是有很多的。但是为什么只保存 path/children/buttons 这三个字段呢？

再重复一遍，由于本项目使用前端路由，并且除了 root 用户外其余用户的路由表都是由有角色分配权限的用户生成后保存于数据库。同时 root 用户默认拥有全部路由，但是路由表不从数据库获取，是前端根据后台返回的数据判断 user.role === 'root' 后将编译在 js 代码变量中的路由挂载给 vue-router。但是这样会产生问题，即：**已经分配至用户的路由不能和 root 默认拥有的全部路由状态同步**。

比如：当 root 添加了角色 A 同时添加了 [临时充值页面] 给角色 A，此时 [临时充值页面] 的路由就会保存在角色表中角色 A 相应的字段。但是一段时间后 [临时充值页面] 已经不需要了。需要删除，此时只需要移除 /src/router/allAsyncRoutes.js 中响应的路由即可将此路由从 root 的路由表中移除。但是问题是，这个路由 **依然存在于** 角色 A 的路由表中。角色 A 登录后获取到的路由表依然有 [临时充值页面]，这就不是我们想要的效果了。

因此我们需要去写接口更新路由。但是这样已经违背了前端路由的初衷：**把路由管理权限从后端手里拿过来**。因此再让后端去写接口遍历更新所有用户的路由表是断然不行的！

因此经过和同事讨论，我们决定采取保存路由最简模式，即只保留最关键的权限信息，其余信息都是在从后端拿到上面那段信息后对比路由表再进行填充的。因此可以保证各个角色路由信息和 **root** 保持一致。对比路由表其实就是把 path 作为 唯一 id 和写进前端 js 中的路由进行对比。因此即使是因为业务变更导致 path 发生变化，已经添加的原有 path 也不会出现。

同时 **root** 也可以把 **角色管理** 和 **账号管理** 分配给下级角色，下级角色也可以再分配，但是可分配权限只有上级配置配置给自己的。

### 角色等级
---

本项目中用到了 level 字段来表示角色等级，在角色管理的时候会用到。因为 **root** 在分配权限的时候，可以把 [角色管理] 页面也分配给下级比如这个角色叫 [大总管]，于是 [大总管] 便也可以管理角色。但是无论是实际上还是理论上，[大总管] 的角色管理列表中都应该出现 **root** ，更不要说删除了。即角色只能管理由自己创建的角色或者自己创建的角色创建的角色，账号也是同理。就像总经理可以开除主管开除组长，但是后两者却不能反之。还有需要注意的，因为这里 mock 数据简单的使用了数字来表示 level。**root** level 为 0，创建的角色 ++，依次类推。因此可能有不同角色创建的角色的 level 是一样的，即自己可以看到自己同级的角色创建的角色，这里没有做区分，可以根据需求自行扩展。

### 逻辑修改
---

路由层面权限的控制代码都在 **/src/permission.js** 中，如果想修改逻辑，直接在适当的判断逻辑中 next() 释放钩子即可。

路由添加/编辑之前对路由表的处理在 **/src/views/admin/role/indexvue** 中。

从后端拿到路由表将路由还原为 route 对象的处理在 **/src/store/modules/permission.js** 中。

### 按钮权限
---

本项目实现了按钮级别的权控。使用起来也很简单，首先在路由中添加 buttons 数组：

```js
    {
        path: 'button-auth',
        name: 'ButtonAuth',
        meta: { title: '按钮权控' },
        buttons: [
            { name: 'add', label: '添加' }, // name 为按钮的唯一标识。label 为分配权限时展示的名字
            { name: 'del', label: '删除' },
            { name: 'edit', label: '编辑' },
            { name: 'search', label: '搜索' },
            { name: 'batch', label: '批量处理' }
        ],
        component: () => import('@/views-ui-template/components/button-auth-control')
    },
```

使用只要在组件想要权控的按钮上加上：

```html
    <el-button v-button-auth-control:search type="primary">搜索</el-button>
```

自定义指令参数的值就是在路由表中 buttons item 里的 name。

## 4、快捷导航(标签栏导航)

以前那些传统后台框架往往会包含此功能，由于以前的后台项目大部分都是多页面的形式，所以标签栏导航功能还是具有一定意义的基本，大部分都是基于 iframe 的方式实现的。但随着时代的发展，现在的后台项目几乎都是 spa(single page web application 单页面开发)，再使用以前的方案来实现标签导航显然是不合适的。所以目前的方案大致为： 运用 keep-alive 和 router-view 的结合。代码见：**/src/layout/components/AppMain.vue**。

顶部标签栏导航实际作用相当于 nav 的另一种展现形式，其实说白了都是一个个 router-link，点击跳转到相应的页面。然后我们在来监听路由 $route 的变化，来判断当前页面是否需要重新加载或者已被缓存。

### visitedViews && cachedViews
---

- visitedViews : 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
- cachedViews : 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。

### 注意事项
---

由于目前 keep-alive 和 router-view 是强耦合的，而且查看文档和源码不难发现 keep-alive 的 include 默认是优先匹配组件的 name ，所以在编写路由 router 和路由对应的 view component 的时候一定要确保 两者的 name 是完全一致的。(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)。

### Affix
---

当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）。

## 5、新增页面

本项目使用了 plop 帮助快速创建页面/组件模板。

首先在项目目录打开终端，输入 `npm run new`

选择 view ，输入名字（这里是 New）。plop 就会在 views 中创建一个新的页面。

然后需要在 /src/router/asyncRoutes.js 中增加你需要添加的路由

```js
  {
    path: '/new',
    name: 'New',
    redirect: '/new',
    component: Layout,
    alwaysShow: true,
    meta: { title: '新建页面:alwaysShow', icon: 'el-icon-magic-stick' }
  },
```

仅仅这样不会有任何效果的，它只是创建了一个基于layout的一级路由，你还需要在它下面的 children 中添加子路由。

```js
  {
    path: '/new',
    name: 'New',
    redirect: '/new',
    component: Layout,
    alwaysShow: true,
    meta: { title: '新建页面:alwaysShow', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: '', // 这里不能加 / ！！！
        name: 'New',
        meta: { title: '新建页面' },
        component: () => import('@/views/New')
      }
    ]
  },
```

这样侧边栏就会出现 New 页面了。

由于 children 下面只声明了一个路由所以不会有展开箭头，如果children下面的路由个数大于 1 就会有展开箭头，如下面所示。 如果你想忽视这个自动判断可以使用 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由。

### 多级目录(嵌套路由)
---

如果你的路由是多级目录，如本项目 **/src/views-ui-template/charts** 那样， 有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个 router-view。

```html
  <template>
    <router-view />
  </template>
```

## 6、样式

在样式开发过程中，有两个问题比较突出：

- 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；

- 选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标示，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多，最终导致难以维护。

好在 vue 为我们提供了 scoped 可以很方便的解决上述问题。 它顾名思义给 css 加了一个域的概念。

```css
/* 编译前 */
.example {
  color: red;
}

/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```

只要加上 scoped 这样 css 就只会作用在当前组件内了。使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 目录结构
---

yinchengnuo-admin-ui 所有全局样式都在 **/src/styles** 下设置

```bash
├── styles
│   ├── btn.scss                 # 按钮样式
│   ├── element-ui.scss          # 文档样式
│   ├── element-ui.scss          # 全局自定义 element-ui 样式
│   ├── index.scss               # 全局通用样式
│   ├── mixin.scss               # 全局mixin
│   ├── sidebar.scss             # sidebar css
│   ├── transition.scss          # vue transition 动画
│   └── variables.scss           # 全局变量
```

常见的工作流程是，全局样式都写在 src/styles 目录下，每个页面自己对应的样式都写在自己的 .vue 文件之中

### 自定义 element-ui 样式
---

现在我们来说说怎么覆盖 element-ui 样式。由于 element-ui 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能加 scoped，但你又想只覆盖这个页面的 element 样式，你就可在它的父级加一个 class，用命名空间来解决问题。

```css
.article-page {
  /* 你的命名空间 */
  .el-tag {
    /* element-ui 元素*/
    margin-right: 0px;
  }
}
```

**当然也可以使用深度作用选择器 下文会介绍**。

### 父组件改变子组件样式 深度选择器
---

当你子组件使用了 scoped 但在父组件又想修改子组件的样式可以 通过 >>> 来实现：

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

将会编译成

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

如果你使用了一些预处理的东西，如 sass 你可以通过 /deep/ 来代替 >>> 实现想要的效果。

所以你想覆盖某个特定页面 element 的 button 的样式，你可以这样做：

```css
.xxx-container >>> .el-button{
  xxxx
}
```

### Mixin
---

本项目没有设置自动注入 sass 的 mixin 到全局，所以需要在使用的地方手动引入 mixin

```scss
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
</style>
```

如需要自动将 mixin 注入到全局 ，可以使用[sass-resources-loader](https://github.com/shakacode/sass-resources-loader)。

#& 7、和服务端进行交互

### 前端请求流程
---

在本项目中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 api service 请求函数；
3.  使用封装的 request.js 发送请求；
4.  获取服务端返回；
5.  更新 data；

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 **/src/api** 文件夹中，并且一般按照 views 目录进行拆分文件，如：

```bash
├── api
│   ├── admin
|————————|
|        |———role.js
|        |———user.js
```

### request.js
---

其中，/src/utils/request.js 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。它封装了全局 request拦截器、response拦截器、统一的错误处理、统一做了超时处理、baseURL设置等。

### 一个请求文章列表页的例子
---

```js
// api/article.js
import request from '../utils/request';
export const api_fetchList = params => request.get('/article/list', { params })

// views-ui-template/pages/example/list
import { api_fetchList } from '@/api/article'
export default {
  data() {
    list: null,
    listLoading: true
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api_fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
```

### $request 方法
---

通过上面的示例，你可以快速掌握如何使用 request。但是在示例业务逻辑中，还是略显啰嗦。如在网络请求的前后控制 loading 等。因此这里封装了一个 $request 方法，实现了快速网络请求：

```js
// views-ui-template/pages/example/list
import { api_fetchList } from '@/api/article'
export default {
  data() {
    list: null
  },
  methods: {
    fetchData() {
      this.$request(api_fetchList(), data => {
        this.list = data.items
      })
    }
  }
}
```

$request 源码在 **/src/plugin/prototype.js** 中。


# yinchengnuo-admin-ui
