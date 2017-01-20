const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

module.exports = {
    context: path.resolve(__dirname),
    entry: './index',
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: '[name].js',
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    `css-loader?importLoaders=1&sourceMap=${!isProduction}`,
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV)
            }
        })
    ]
};
