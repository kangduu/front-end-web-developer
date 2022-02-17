[TypeScript中如何使用webpack的require.context](https://my.oschina.net/u/4691589/blog/4710051)

### 问题描述

在我们实际开发中，经常使用`require.context()`来管理依赖。

可是当我们在使用typescript开发时，会遇到如下问题:

```tsx
// require.context 报错: 类型“NodeRequire”上不存在属性“context”。
const context = require.context(".", false, /\.creators\.js$/)
context.keys().forEach((key: any) => {
   ...
});
```

### 解决办法

```cmd
npm i @types/webpack-env @types/node -D
```

