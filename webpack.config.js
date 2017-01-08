var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'index.js': './src/js/index.js'
    },
    module: {
        loaders: [
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract("style", "css!sass") 
            },
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
        path: __dirname + '/dist',
        publicPath: '/dist/'
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
            filename: '../index.html',
            // templateContent: fs.readFileSync('./www/index.html', { encoding: 'utf-8' })
            template: './src/index.html'
        }),
        new ExtractTextPlugin('[hash].css')
    ]
};