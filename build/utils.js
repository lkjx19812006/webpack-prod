const path = require('path')
const config = require('../config')
const glob = require('glob')
// css 分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.production.assetsSubDirectory
    : config.development.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    scss: generateLoaders('sass')
  }
}

// Generate loaders for standalone style files (outside of .vue)
module.exports.styleLoaders = function (options) {
  const output = []
  const loaders = module.exports.cssLoaders(options)
  // console.log(loaders);
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      exclude: [
        path.resolve(__dirname, '../src/html/**/*.css')
      ]
    })
  }
  return output
}

/**
 * 获取多级入口文件
 * @param globPath
 * @returns {{}}
 */
exports.getMultiEntry = function (globPath) {
  let entries = {};
  let basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/');
    // 如果路径为 / ./ ../开头，则先去掉
    if (['', '.', '..'].indexOf(tmp[0]) > -1) {
      tmp = tmp.slice(1)
    }
    if (tmp[0] === 'src') {
      pathname = tmp.slice(1).join('/')
      entries[pathname] = entry;
    }
  });
  return entries;
}
