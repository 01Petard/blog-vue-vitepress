# 使用Go开发后端

项目地址：https://github.com/01Petard/gin_demo

## 安装Go

官网：https://go.dev/dl/

## 初始化项目

```go
go mod init "项目名"
```

## 使用开发框架

安装`gin`，官方文档：https://gin-gonic.com/zh-cn/docs/

```go
go env
```

```go
go env -w GO111MODULE=on
```

```go
go env -w GOPROXY=https://goproxy.cn,direct
```

```go
go get -u github.com/gin-gonic/gin
```

## 连接数据库

安装`gorm`，官方文档：https://gorm.io/docs/

```go
go get -u gorm.io/gorm
```

```go
go get -u gorm.io/driver/sqlite
```

## 配置Jwt权限认证

安装`jwt-go`：https://pkg.go.dev/github.com/dgrijalva/jwt-go/v4

```go
go get github.com/dgrijalva/jwt-go/v4
```

## 配置文件

安装`viper`：https://github.com/spf13/viper

```go
go get github.com/spf13/viper
```

# 使用Vue开发前端

## 搭建前端

```shell
npm install -g @vue/cli
```

```shell
vue create "项目名"
```

或
（推荐）

```shell
npm init vite@latest
```

`Vue CLI` vs `Vite`

| **对比项**        | **Vue CLI**                             | **Vite**                                  |
| ----------------- | --------------------------------------- | ----------------------------------------- |
| **构建工具**      | 基于 Webpack                            | 原生 ES 模块 + Rollup（生产环境）         |
| **启动速度**      | 慢，需先编译整个项目                    | 快，按需编译（即时热更新）                |
| **HMR（热更新）** | 速度较慢，编译整个文件                  | 速度快，修改文件立即生效                  |
| **性能优化**      | 需手动配置 `webpack.config.js` 进行优化 | 内置优化，如 `esbuild` 进行 TS/JS 解析    |
| **适用场景**      | 适用于大规模、成熟的企业级项目          | 适用于前端开发、现代 Web 项目             |
| **插件生态**      | Vue CLI 插件较丰富                      | Vite 生态日益丰富，且可使用 ES 模块化生态 |
| **SSR 支持**      | 需要额外插件或手动配置                  | 内置 SSR（服务器端渲染）支持              |

## 使用开发框架

安装`elementUI Plus`：[Overview 组件总览 | Element Plus](https://element-plus.org/zh-CN/component/overview.html)

```shell
pnpm install element-plus
```

在`main.js`中引入：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

## 使用路由

```shell
pnpm install vue-router
```

## 配置 Vue Router

在 `src/router/index.js`（如果没有这个文件，需要新建）：

```js
js复制编辑import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(), // 启用 History 模式
  routes
})

export default router
```