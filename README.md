# Vue 3 + Vite + pinia + element-plus + axios + sass

推荐 node 版本 20 以上<br/>

## 说明

### 引入了自动导入功能

#### 在 vite.config.js AutoImport 配置需要按需引入的对象

#### 目前已配置 element-plus,element-plus-icon,vue,vue-router.可在文件里面直接只用这些对象的属性方法，不需要再去 import

#### element-plus-icon 的引用方式为`<i-ep-User/>`会自动渲染成 svg

### 根据 pages 文件夹下面的文件自动生成路由和导航

#### `pages/404.vue` 会生成路由 path 为 `/404`

#### `pages/home/Index.vue` 会生成路由 path 为 `/home`

#### `pages/home/Detail.vue` 会生成路由 path 为 `/home/detail`

### pages 文件夹下面的除了 components 文件夹里面的内容，其他的都会自动生成路由和导航

### 重新封装了 el-table

#### 添加了监听页面缩放重新更新 table 大小

## 规范

#### 推荐在 app.vue 里面配置全局样式

#### 推荐在 app.vue 里面声明或者重写 element-plus 的:root 全局 css 变量

#### 字体大小，字体样式，颜色，间距等最好使用`var(--*)`的方式方便以后全局改变

#### 推荐 class 以 `-` 符号连接 2 个单词

#### pages 文件夹下面的 vue 文件最顶层 class 为`*-page`

#### components 文件夹下面的 vue 文件最顶层 class 为`*-component`

#### layout 文件夹下面的 vue 文件最顶层 class 为`*-layout`

#### 多个页面用到的组件建议放到`src/components`文件夹下面，单个文件用到的组件建议放在当前文件同级的`components`文件夹下面

## 运行

#### npm install

#### npm run dev
