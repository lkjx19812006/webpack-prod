// 合并 webpack 配置
const merge = require('webpack-merge')
const path = require('path')
// css 分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 基本配置
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const utils = require('./utils.js')
const env = process.env.NODE_ENV || 'production'
const cfg = config[env]

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  output: {
    path: config.production.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  optimization: {
    runtimeChunk: {
      // name: entrypoint => `${entrypoint.name}/js/runtime`
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: cfg.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
