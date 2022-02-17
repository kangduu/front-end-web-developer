const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    devServer: { // 开启本地静态服务,需要安装webpack-dev-server
        port: 8000, // 端口
        progress: true, // 进度条
        contentBase: "./dist", // 哪一个文件夹
        compress: true, // 压缩
        open: true // 自动打开
    },
    mode: "development",//模式 "production"[default] | "development" | "none"
    entry: "./src/index.js",// 入口 String | Array<string> | Object
    output: {
        // filename: "bundle.[hash:6].js", 指纹
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    // 优化项
    optimization: {
        // production模式下，将css压缩为一行，【实际看文档操作即可】
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    // 模块
    module: {
        rules: [ // 规则
            {
                test: /\.css$/,
                // loader的用法：String | Array<string | object> 
                // loader的特点：希望单一
                // loader的解析顺序：从右到左 | 从下到上
                // css-loader 解决 @import 语法
                // style-loader 将css插入html的head中
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         // 设置 style | link 标签的位置， 默认head的最后。
                    //         // insert: 'body'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,// 替换 style-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader',
                    // postcss-loader实现自动添加浏览器前缀，你需要实现以下操作
                    // 1. 编写postcss.config.js配置文件，
                    // 2. 安装autoprefixer插件
                    // 3. package.json中添加属性"browserslist":["defaults","not ie < 11","last 2 versions","> 1%","iOS 7","last 3 iOS versions"]
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板文件
            filename: 'index.html', // 输出文件名
            hash: true,
            minify: { // 缩小
                removeAttributeQuotes: true,// 删除双引号
                collapseWhitespace: true // 折叠空行，输出则为一行
            }
        }),
        // 将css文件抽离为单文件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}