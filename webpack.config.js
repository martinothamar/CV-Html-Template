var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const internalCSS = new ExtractTextPlugin('loader.css');
const externalCSS = new ExtractTextPlugin('[hash].css');

module.exports = {
    entry: {
        'index.js': './src/js/index.js'
    },
    module: {
        loaders: [
            { test: /loader\.scss/, loader: internalCSS.extract("style", "css!sass") },
            { test: /\.scss$/, exclude: /loader\.scss/, loader: externalCSS.extract("style", "css!sass") },
            { test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/, loader: 'file-loader' },
            {
                test: /.*\.(gif|png|jpeg|jpg|svg|ico)(\?.*$|$)/i,
                loaders: [
                    'file-loader',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    output: {
        filename: '[hash].js',
        path: __dirname + '/dist'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        internalCSS,
        externalCSS,
        new StyleExtHtmlWebpackPlugin('loader.css')
    ]
};