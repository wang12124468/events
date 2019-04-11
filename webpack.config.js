var webpack = require('webpack');
var path = require('path');

function generateConfig(name) {
    var uglify = name.indexOf('min') > -1;
    var config = {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: name + '.js',
            sourceMapFilename: name + '.js.map',
            library: 'Events',
            libraryTarget: 'umd'
        },
        node: {
            process: false
        },
        mode: uglify ? 'production' : 'development',
        devtool: 'source-map'
    };

    return config;
}

config = [generateConfig('events'), generateConfig('events.min')];

module.exports = config;