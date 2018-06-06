const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const utils = require('./utils')
const config = require('../config')
const env = process.env.NODE_ENV || 'development'
const cfg = config[env]

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  output: {
    publicPath: cfg.assetsPublicPath
  },
  externals: {
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        type: 'javascript/auto',
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src')],
        options: {
          limit: 10000,
          name: 'm/FOSUN20180522001/images/[name].[hash:7].[ext]'
          // name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'm/FOSUN20180522001/fonts/[name].[hash:7].[ext]'
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
