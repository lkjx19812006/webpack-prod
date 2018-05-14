const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const history = require('connect-history-api-fallback')
// 用于把请求代理转发到其他服务器的中间件。具体自行搜索
const proxy = require('http-proxy-middleware')
// koa 中间件必须
const convert = require('koa-connect')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const env = process.env.NODE_ENV || 'development'
const cfg = config[env]

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false
    })
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: cfg.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../src/html'),
        to: '',
        cache: true
      }
    ])
  ],
  serve: {
    content: [__dirname],
    hot: true,
    host: cfg.host,
    port: cfg.port,
    open: cfg.autoOpenBrowser,
    add: (app, middleware, options) => {
      if (cfg.proxyTable) {
        Object.keys(cfg.proxyTable).forEach((p) => {
          app.use(convert(proxy(p, cfg.proxyTable[p])))
        })
      }
      app.use(convert(history()))
    }
  }
})
