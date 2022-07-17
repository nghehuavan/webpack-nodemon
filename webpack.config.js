const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devServerPort = 8080;
const expressServerPort = 8081;

module.exports = {
  mode: 'development', // 'production'
  entry: {
    index: ['./client/index.js', './client/index.scss'],
    about: ['./client/about.js'],
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: devServerPort,
    watchFiles: ['./client/*.html'],
    open: true,
    proxy: {
      '/api': {
        target: `http://localhost:${devServerPort}`,
        router: () => `http://localhost:${expressServerPort}`,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'about.html'),
      filename: 'about.html',
      chunks: ['about'],
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'client', 'sw.js'),
          to: path.join(__dirname, 'dist', 'sw.js'),
        },
      ],
    }),
  ],
};
