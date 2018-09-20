var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var glob = require('glob');

// 自动打开浏览器
var OPEN_BROWSER = require('open-browser-webpack-plugin');
var OPEN_BROWSER_URL = 'http://localhost:' + config.dev.port + '/';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OPEN_BROWSER({url: OPEN_BROWSER_URL}),
  ]
})

var pages = utils.getEntry('./src/index.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true              // js插入位置
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['static/common/vendors', pathname, 'manifest'];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
