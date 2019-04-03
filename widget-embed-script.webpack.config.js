const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let config = require('./base.webpack.config.js');


module.exports = Object.assign({}, config, {
    entry: './src/widget/widget.tsx',
    output: {
        path: path.join(__dirname, '/dist/public/widget'),
        filename: 'embed-widget.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'widget.css',
            chunkFilename: '[id].css'
        })
    ]
});