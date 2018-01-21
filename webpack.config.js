const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    watch: true,
    cache: false,
    context: path.join(__dirname, 'app/'),
    entry: ['./app.js'],
    devServer: {
        historyApiFallback:{
            index: '/'
        }
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.html', '.scss', 'css'],
        modules: ['node_modules'],
        alias: {
            components: path.resolve(__dirname, 'app/components/'),
            assets: path.resolve(__dirname, 'app/assets/'),
            actions: path.resolve(__dirname, 'app/actions/'),
            reducers: path.resolve(__dirname, 'app/reducers/'),
        }
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'presets':[
                                'es2015',
                                'react'
                            ],
                            'plugins': [
                                ['import', { 'libraryName': 'material-ui', 'style': 'css' }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {modules: true , sourceMap: true, localIdentName: '[local]'}}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {modules: true, sourceMap: true, localIdentName: '[local]'}},
                    {loader: 'sass-loader', options: {modules: true , sourceMap: true, localIdentName: '[local]'}}
                ]
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                use: [
                    {loader: 'file-loader?name=[name].[ext]'}
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {loader: 'file-loader?name=[name].[ext]'}
                ]
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};
