### `Node.js ` 的模块加载

在 `v13.2` 版本之前，`Node.js`仅支持`CommonJS模块`，简称：`CJS`。在`ES6`添加了模块机制后，`Node.js`也从此版本开始支持`ES6模块`，简称：`ESM`。

🤔 **Questions：** 如何区分和使用这两种模块？

在此之前，我们先来了解一下`package.json`文件中的`type`字段。`type`字段用于解析模块，包含的值有：`'module' | 'commonjs'`。默认情况下，`type`字段是没有设置的，此时`Node.js`以`CJS`规范解析模块。

总结为一句话：**`.mjs`文件总是以 `ES6` 模块加载，`.cjs`文件总是以 `CommonJS` 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。**

1. CommonJS

文件名以 `.js` 或 `.cjs` 结尾，不设置`type`字段，或将`type`字段值设置为‘`commonjs`’，同时使用`require()`和`module.exports`进行导入导出操作。

```js
// a.js
const a = 10;
module.exports.a = a;

// b.js
const a = require("./a.js");
const b = 1;
console.log(a + b); // 11
```

2. ES6 Module

文件名以 `.js` 或 `.mjs` 结尾，将`type`字段值设置为‘`module`’，同时使用`import`和`export`进行导入导出操作。

```js
// m.js
const m = 10;
export default a;

// n.js
import m from "./m.js";
const n = 1;
console.log(m + n); // 11
```
