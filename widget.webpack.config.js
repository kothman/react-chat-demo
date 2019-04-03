const path = require('path');
let config = require('./base.webpack.config.js');

module.exports = Object.assign({}, config, {
    entry: './src/widget/index.tsx',
    output: {
        path: path.join(__dirname, '/dist/public/widget'),
        filename: 'bundle.js'
    }
});