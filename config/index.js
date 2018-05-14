// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
// 获取IP地址
var internalIp = require('internal-ip')

module.exports = {
  production: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  development: {
    port: 8088,
    host: internalIp.v4.sync(), // 仅本地可改成 host: 'localhost'
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/spb': {
        target: 'http://test.spb.riskeys.com/',
        changeOrigin: true
      },
      '/ws_sso': {
        target: 'http://sso.test.anyi-tech.com/',
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
