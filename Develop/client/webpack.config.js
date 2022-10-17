const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// : Add and configure workbox plugins for a service worker and manifest file.

plugins: [
  
  new HtmlWebpackPlugin({
    template: './index.html',
    title: 'jate',
  }),
  // new MiniCssExtractPlugin(), 
  //new WorkboxPlugin.GenerateSW()
 
    new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'src-sw.js',
  }),new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: "Just Another Text Editor",
    short_name: "jate",
    description: "Takes notes with JavaScript",
    start_url: "/",
    publicPath: "/",
    icons: [
      {
        src: path.resolve('./src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
      }
    ],
  }),
]
// : Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        }
      ],
    },
  };
};