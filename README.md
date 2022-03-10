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



### 代码规范

 EditorConfig + Prettier + ESLint 组合来实现代码规范化。

VsCode编辑器： 需要下载插件**Prettier - Code formatter** 。

### 提交规范

集成 husky 和 lint-staged让代码提交有一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

#### commit message 格式规范

commit message 由 Header、Body、Footer 组成。

Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。

**type**

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增一个功能                                                 |
| fix      | 修复一个 Bug                                                 |
| docs     | 文档变更                                                     |
| style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
| refactor | 代码重构                                                     |
| perf     | 改善性能                                                     |
| test     | 测试                                                         |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具                                       |
| revert   | 代码回退                                                     |

**scope**  

用于指定本次 commit 影响的范围

**subject**

subject 是本次 commit 的简洁描述

**Body**

body 是对本次 commit 的详细描述

**Footer**

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

