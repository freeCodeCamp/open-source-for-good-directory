const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev =
  process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;
console.log(process.env.NODE_ENV);

const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': dev ? 'development' : 'production'
});

const UglifyPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
});

const LoaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
});

const config = {
  entry: ['react-hot-loader/patch', path.join(__dirname, '/src/index.js')],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/docs')
  },
  plugins: dev
    ? [
        DefinePluginConfig,
        HTMLWebpackPluginConfig,
        HotModuleReplacementPluginConfig
      ]
    : [
        HTMLWebpackPluginConfig,
        DefinePluginConfig,
        LoaderOptionsPluginConfig,
        UglifyPluginConfig
      ]
};

module.exports = config;
