const path = require('path');
const mode = process.env.NODE_ENV


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
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
    },

    
}
// if(chart){
//     configs.plugins.push(new BundleAnalyzerPlugin())
// }
// if(mode == 'development'){
//     configs.output.chunkFilename = prefixOutput+'bundle.[name].js'
// }
// if(mode == 'production'){
//     configs.mode = 'production'
//     configs.watch = false
// }

module.exports = configs
