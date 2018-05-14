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
const env = process.env.NODE_ENV || 'development'
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[id].[chunkhash:8].css' // use contenthash *
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: cfg.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../src/html'),
        to: '',
        ignore: ['cloud.core.js'],
        cache: true
      },
      {
        from: path.resolve(__dirname, '../src/html/**/cloud.core.js'),
        to: '',
        context: path.resolve(__dirname, '../src/html'),
        transform (content, path) {
          return content.toString().replace(/self\.config\s*=\s*"dev";/gi, 'self.config= "prod";')
        },
        ignore: ['.*']
      }
    ])
  ]
})
