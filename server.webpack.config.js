const path = require('path');
const nodeExternals = require('webpack-node-externals');
let config = require('./base.webpack.config.js');

module.exports = Object.assign({}, config, {
    entry: './src/server/server.ts',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()]/*,
    module: {noParse: ['ws']}*/
});