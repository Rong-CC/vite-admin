## 快速开始

### 安装依赖

```
npm install
# or
yarn add
# or
pnpm install
```

### 启动项目

```
npm run dev
```

### 项目打包

```
npm run build
```

#### 项目结构

```
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── config/                    // 系统配置
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```

### 项目依赖

Vue3.2 + Element-Plus+Pinia+Vite 项目

推荐使用 pnpm 包管理依赖

使用Pinia 代替 Vuex

