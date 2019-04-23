const path = require('path');
const nodeExternals = require('webpack-node-externals');
let config = require('./base.webpack.config.js');

module.exports = Object.assign({}, config, {
    entry: './tests/index.ts',
    output: {
        path: path.join(__dirname, '/tests'),
        filename: 'all-tests.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'inline-source-map'
});