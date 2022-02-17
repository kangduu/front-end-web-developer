## 清理 /dist 文件夹
- [webpack指南](https://webpack.docschina.org/guides/output-management/#cleaning-up-the-dist-folder)
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 注意这里的引入方式
```

## 使用`html-webpack-plugin` 管理输出`html`

1. 安装依赖

   > npm install --save-dev html-webpack-plugin

2. 配置插件

   ```js
   const HtmlWebpackPlugin = require("html-webpack-plugin")
   
   module.exports = {
       // ...
       plugins: [
           // 自动生成html文件
           new HtmlWebpackPlugin({
               title:"html-webpack-plugin",// title标签
               template: './src/index.html', // 指定模板文件
               filename: 'index.html', // 输出文件名
               hash: true,
               minify: { // 缩小
                   removeAttributeQuotes: true,// 删除双引号
                   collapseWhitespace: true // 折叠空行，输出则为一行
               }
           }),
       ]
   }
   ```




## 加载图片

### 图片格式

`png` 、`jpg`、`svg`、`gif`、etc

### 项目中引入图片的几种情况？

1. 在样式文件中引入：`url(path)` | css预处理器变量（@img | $img）
2. 在js中使用模块机制导入：import Icon from "path"



## 加载CSS

- [css-loader](https://www.webpackjs.com/loaders/css-loader/)
- [less-loader](https://www.webpackjs.com/loaders/less-loader/)
- [sass-loader](https://www.webpackjs.com/loaders/sass-loader/)
- [postcss-loader](https://www.webpackjs.com/loaders/postcss-loader/)

### rules 配置

```js
module.exports = {
    ...,
    module: {
        rules: [
            // css处理
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // less 
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "less-loader",
                    }
                ]
            }
        ]
    }
}
```

### 使用`mini-css-extract-plugin`将css抽离为单文件

1. 安装依赖

> npm install --save-dev mini-css-extract-plugin

2. 配置模块（module）

   首先我们需要使用`MiniCssExtractPlugin.loader`替换`style-loader`；

   ```js
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module.exports = {
       // ... 
       module: {
           rules: [
               {
                   test: /\.css$/,
                   use: [
                       // 'style-loader',
                       MiniCssExtractPlugin.loader, // 替换 style-loader
                       'css-loader',
                       'postcss-loader'
                   ]
               },
           ]
       },
   }
   ```

3. 添加插件配置（plugins）

   ```js
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module.exports = {
       // ...
       plugins: [
           // 将css文件抽离为单文件
           new MiniCssExtractPlugin({
               filename: '[name].css',
               chunkFilename: '[id].css'
           })
       ]
   }
   ```

   



### 使用`postcss-loader`实现自动添加浏览器前缀

​	关于css3的前缀，并不是所有样式属性都需要，主要是针对不同的浏览器，实现方式不同的属性。比如：user-select等

1. 安装对于依赖包

> npm install --save-dev postcss-loader autoprefixer

2. 编写`postcss.config.js`文件，并在`webpack.config.js`中添加'postcss-loader'选项

   ```js
   // postcss.config.js
   module.exports = {
       plugins: [require('autoprefixer')]
   }
   
   // webpack.config.js
   module.exports = {
       // ... 
       module: {
           rules: [
               {
                   test: /\.css$/,
                   use: [
                       'style-loader',
                       { loader: 'css-loader', options: { importLoaders: 1 } },
                       'postcss-loader'
                   ]
               }
           ]
       }
   }
   ```

3. 在`package.json`文件中添加属性"browserslist"

   ```json
   {
       "browserslist": [
           "defaults",
           "not ie < 11",
           "last 2 versions",
           "> 1%",
           "iOS 7",
           "last 3 iOS versions"
       ]
   }
   ```



## 配置

#### entry



## ES2015+ 新特性

#### 模块

> webpack 内部已经实现对 ES2015中的`import` 和 `export` 的原生支持



## package.json

#### 确保安装包私有？

```json
{
  ...
+ "private": "true",
  ...
}
```

#### 防止意外发布代码？

```json
{
  ...
- "main": "index.js",
  ...
}
```



## 开发环境和生产环境

#### devDependencies 和 dependencies

- devDependencies 只用于开发环境
- dependencies 用于生产环境

举个🌰

```json
"devDependencies": { 
  "webpack": "^4.44.1",
  "webpack-cli": "^3.3.12"
},
"dependencies": {
  "lodash": "^4.17.20"
}
```

#### npm install sax

###### 指令

- `--save-prod`           **alias**  `-P` ，添加dependencies 里面所有的包。在 `-D` `-O` 不存在时，`-P` 就是默认值
- `--save`                     **alias** `-S` ，添加dependencies 里面所有的包。
- `--save-dev`             **alias** `-D` ，添加devDependencies里面所有的包。
- `--save-optional`    **alias** `-O` ，添加<u>optionalDependencies</u>里面所有的包。
  - `--no-save` 				 阻止保存记录在dependencies 中

###### 参考

- [npm 解析](https://docs.npmjs.com/cli/install)

#### 需求区分----各取所需

###### 开发环境的需求

- 模块热更新  （本地开启服务，实时更新）
- sourceMap    (方便打包调试)
- 接口代理　    (配置proxyTable解决开发环境中的跨域问题)
- 代码规范检查 (代码规范检查工具)

###### 生产环境的需求

- 提取公共代码
- 压缩混淆(压缩混淆代码，清除代码空格，注释等信息使其变得难以阅读)
- 文件压缩/base64编码(压缩代码，减少线上环境文件包的大小)
- 去除无用的代码

###### 开发环境和生产环境的共同需求

- 同样的入口
- 同样的代码处理(loader处理)
- 同样的解析配置



## 配置 ES6/7+ 语法转译为ES5语法

- 对ES6语法的支持

```
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不包括的文件夹 node_modules
        use: {
          loader: 'babel-loader', // es6 转 es5
          options: {
            presets: [ // 只支持部分语法
              '@babel/preset-env'
            ],
            plugins: [ // class
              '@babel/plugin-proposal-class-properties'
            ]
          },
        }
      },
    ],
  },
}
```

babel-env插件只能处理部分ES6的语法，如class，generator等却无能为力，这时我们就需要使用其它的插件了。如@babel/plugin-proposal-class-properties

- 对ES7等高级语法的支持

```
npm install @babel/plugin-transform-runtime  --save-dev
npm install @babel/runtime --save
```

```json
// .babelrc 文件
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "target": {
          "borwsers": [
            "> 1%",
            "last 2 versions"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "@babel/transform-runtime"
  ]
}
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不包括的文件夹 node_modules
        use: {
          loader: 'babel-loader', // es6 转 es5
        }
      },
    ],
  },
}
```



## 使用webpack-dev-server配置本地开发服务

1. `npm install webpack-dev-server --save-dev`

2. webpack.config.js配置devServer属性

   ```js
   module.exports = {
     // ... 
     devServer: { 				// 开启本地静态服务,需要安装webpack-dev-server
       port: 8000, 			// 端口
       progress: true, 		// 进度条
       contentBase: "./dist", 	 // 哪一个文件夹
       compress: true,			// 压缩
       open: true				// 自动打开
     }
   }
   ```

3. `http://localhost:8080/` 这样的本地地址



## 使用HtmlWebpackPlugin插件自动生成html文件

1. `npm install html-webpack-plugin --save-dev`

2. 配置项 webpack.config.js

   ```js
   
   ```
   
   

