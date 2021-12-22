const path = require('path');

let configs = {
    entry: './resources/views/js/main.js',
    watch: true,
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', { targets: "defaults" }]
                  ]
                }
              }
            }
          ]
    },
    
}

module.exports = configs
