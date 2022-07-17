const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerPort = 8080;
const expressServerPort = 8081;

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.js'],
    about: ['./src/about.js'],
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
    watchFiles: ['./src/*.html'],
    proxy: {
      '/api': {
        target: `http://localhost:${devServerPort}`,
        router: () => `http://localhost:${expressServerPort}`,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'about.html'),
      filename: 'about.html',
      chunks: ['about'],
    }),
  ],
};
