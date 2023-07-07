/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    stats: {
        children: true,
    },
    resolve: {
        fallback: {
            path: false,
        },
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },

    devtool: 'inline-source-map',

    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
    },
};
