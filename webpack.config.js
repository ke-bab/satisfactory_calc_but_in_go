const path = require('path');

module.exports = {
    mode: "development",
    entry: './front/src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname + '/front/', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(?:js|jsx|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}],
                            ["@babel/preset-react",{"runtime": "automatic"}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
};