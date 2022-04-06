# 什么情况下 tsconfig.json 文件会被忽略？

1. 不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，**逐级向上搜索父目录**。
2. 不带任何输入文件的情况下调用 tsc，且使用命令行参数--project（或-p）指定一个包含 tsconfig.json 文件的目录。

> 当命令行上指定了输入文件时，tsconfig.json 文件会被忽略。

命令行编译 ts 文件的两种方式？

1. `tsc <file>` ：指定了输入文件参数,这将在输入文件目录中输出同名的编译后的 js 文件。
2. `tsc --watch` : 不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，**逐级向上搜索父目录**。

```json
  "scripts": {
    "start": "tsc --watch", /* 这个构建脚本默认会查找当前项目下的`tsconfig.json`配置文件 */
    /* error: tsc --watch ./src/index.ts  当你指定了具体的ts文件，那么`tsconfig.json`配置文件则被忽略*/
    "test": "node index.js"
  },
```

- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson)

# Typescript 使用 tsc 提示禁止执行脚本的解决方法

```terminal
tsc : 无法加载文件 C:\Users\xxxxxx\AppData\Roaming\npm\tsc.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft
.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ tsc typescript.ts
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

1.管理员权限打开 VSCODE

2.终端输入:Set-ExecutionPolicy Unrestricted 表示可以执行未签名的脚本

3.查看是否设置完成：get-executionPolicy ，输出：Unrestricted

## 【TypeScript】无法重新声明块范围变量

[无法重新声明块范围变量](https://blog.csdn.net/qq_45587822/article/details/106736207)
