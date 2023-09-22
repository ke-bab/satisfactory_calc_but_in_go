const path = require('path');

module.exports = {
    watch: true,
    mode: "development",
    entry: './front/src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname + '/front/', 'dist'),
    },
};