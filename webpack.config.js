const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,
    entry: './index.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // Compile JavaScript files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [ROOT, 'node_modules']
    },
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },
    devServer: {
        static: DESTINATION,
        compress: true,
        port: 9000
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'package.json'), to: './package.json' }
            ]
        })
    ]
};
