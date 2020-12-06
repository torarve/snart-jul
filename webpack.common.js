const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/js/main.js',
        './src/css/main.scss',
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        usedExports: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};