const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 模式 "development" | "production" | "none"
    mode: "development",
    // 入口和上下文
    entry: "./src/index.js",
    // entry: {
    //     app: './src/index.js',npm
    //     print: './src/print.js'
    // },
    // 输出
    output: {
        // filename: "bundle.js",
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: "less-loader",
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // 清理 /dist 文件夹
        new CleanWebpackPlugin({
            // dry: true,
            // verbose: true,
            // protectWebpackAssets: false,
            // cleanOnceBeforeBuildPatterns: [
            //     '**/*',
            //     '!static-files*',
            //     '!directoryToExclude/**',
            // ]
        }),
        // 自动生成html文件
        new HtmlWebpackPlugin({
            title: "Output Management",
            template: './public/index.html', // 指定模板文件
            // filename: 'index.html', // 输出文件名
            hash: true,
            minify: { // 缩小
                removeAttributeQuotes: true,// 删除双引号
                collapseWhitespace: true // 折叠空行，输出则为一行
            }
        }),
        // new HtmlWebpackPlugin({  // Also generate a test.html
        //     filename: 'print/index.html',
        //     template: 'src/index.html'
        // }),
        // 将css文件抽离为单文件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        client: {
            logging: "info",
            overlay: true,
        },
        compress: true,
        port: 9000
    }
}

