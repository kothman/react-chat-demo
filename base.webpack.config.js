const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
    // Changed the entry point to a .tsx file
    entry: './src/web/index.tsx',
    // Enable sourcemaps for debugging Webpack's output
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist/public'),
        filename: 'bundle.js'
    },
    node: {
        __dirname: true
    },
    module: {
    rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { 
            test: /\.tsx?$/, 
            loader: 'ts-loader' 
        }, {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
            }, {
                test: /\.(png|jpg|gif|html)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css',
            chunkFilename: '[id].css'
        })
    ]
};