const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

const VENDOR_LIBS = [
    
    "axios",
    "bootstrap3",
    "jquery",
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-thunk"
];
const devServer ={
    port : 4000,
    open : true,
    disableHostCheck : true,
    historyApiFallback : true,
    overlay: true,
    stats : 'minimal',
    inline : true,
    compress : true,
    contentBase : '/'
}

module.exports = {
    entry : {
        bundle : './src/index.js',
        vendor : VENDOR_LIBS
    },
    output : {
        path : path.join(__dirname, 'dist'),
        filename : '[name].[chunkhash].js'
    },
    module : {
        rules : [
            {
                use : 'babel-loader',
                test : /\.js$/,
                exclude : '/node_modules'
            },
            {
                use : [
                    'style-loader',
                    'css-loader'
                ],
                test : /\.css$/
            },
            {
                loader : 'file-loader',
                test : /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        },
        runtimeChunk: {
            name: "manifest",
        }
    },
      
    plugins : [
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery',
            'window.$' : 'jquery',
            'window.jQuery' : 'jquery'
        }),
        // new optimization.splitChunks({
        //     chunks : 'all'
        // }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer
    
}