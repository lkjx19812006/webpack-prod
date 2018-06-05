// debugger;
// 命令行开发
const program = require('commander');
// 用于命令交互
const inquirer = require('inquirer');
// glob
const glob = require('glob');
// path
const path = require('path');
// webpack html 打包
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css 分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// node --inspect --inspect-brk anyiprod.js dev

/**
 * 根据入口文件获取产品相关配置
 * 产品文件夹中仅识别带main.js的入口文件
 * 当前仅支持m文件夹中的入口文件
 * @returns {{entries: {}, htmlTmp: Array, choices: Array}}
 */
const getProducts = function () {
  let src = './src/m/*/main.js';
  let result = [];
  // 获取产品配置
  const prodConfig = require('./config/product.js');
  glob.sync(src).forEach(function (entry) {
    let tmp = entry.split('/');
    if (tmp.length === 5 && tmp[1] === 'src') {
      // 针对标准产品的目录路径
      const index = tmp.length - 1;
      const entryName = tmp.slice(2, index).join('/');
      const prodId = tmp[3];
      const prod = prodConfig[prodId];

      /**
       * id 产品ID
       * value 用于构建时的ID，基本与产品一致
       * name 构建时显示文本
       * filename 构建后的文件名
       * template 构建所有模板
       * entry 入口文件名称
       * entrySrc 入口文件所在路径
       */
      result.push({
        id: prodId,
        value: prodId,
        name: prod ? [prodId, prod.name].join('-') : prodId,
        filename: tmp.slice(2, index).concat('index.html').join('/'),
        template: tmp.slice(0, index).concat('index.html').join('/'),
        entry: entryName,
        entrySrc: ['babel-polyfill'].concat([entry])
      });
    }
  });
  return result;
};

/**
 * 获取多入口相关配置
 */
const getEntryConfig = function (products) {
  let entry = {};
  let plugins = [];
  products.forEach(p => {
    entry[p.entry] = p.entrySrc;
    plugins.push(new HtmlWebpackPlugin({
      filename: p.filename,
      template: p.template,
      favicon: path.resolve('./static/favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      }
    }))
  });
  return {
    entry: entry,
    plugins: plugins,
  }
};

/**
 * 运行测试环境
 * @param productId
 */
const buildTest = function (productId) {
  let products = getProducts();
  if (productId !== 'all' && productId !== '') {
    products = products.filter(p => {
      return p.id === productId
    });
  }
  const entryConfig = getEntryConfig(products);
  const webpack = require('webpack');
  let config = require('./build/webpack.test.conf');
  config.entry = entryConfig.entry;
  config.plugins.push.apply(config.plugins, entryConfig.plugins);
  // console.log(config);
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
    }
    // 处理完成
  })
};



/**
 * 运行测试服务器
 * @param productId 产品ID
 */
const runDev = function (productId) {
  let products = getProducts();
  if (productId !== 'all' && productId !== '') {
    products = products.filter(p => {
      return p.id === productId
    });
  }
  const entryConfig = getEntryConfig(products);
  // webpack server
  const serve = require('webpack-serve');
  let config = require('./build/anyiprod.dev.conf.js');
  config.entry = entryConfig.entry;
  config.plugins.push.apply(config.plugins, entryConfig.plugins);
  if (products.length === 1) {
    config.serve.open = {
      path: products[0].filename
    }
  }
  serve({config});
}

program
  .command('dev')
  .alias('d')
  .description('运行本地测试环境')
  .option('-p, --prod [product ID]', '产品ID')
  .action(option => {
    let prod = option.prod;
    let promps = [];
    const products = getProducts();
    let inProd = false;
    if (prod) {
      inProd = products.some(p => {
        return p.id + '' === prod + ''
      });
      if (!inProd) {
        console.log('产品ID[' + prod + ']不存在')
      }
    }
    if (!prod || !inProd) {
      let choices = [];
      choices.push({name: '所有产品', value: 'all'});
      products.forEach(p => {
        choices.push({ name: p.name, value: p.value });
      });
      promps.push({
        type: 'list',
        name: 'productId',
        message: '请选择想要运行的产品ID',
        choices: choices
      })

      inquirer.prompt(promps).then(function (answers) {
        const productId = answers.productId;
        runDev(productId);
        console.log(answers)
      })
    } else {
      runDev(prod);
    }
  });


program
  .command('test')
  .alias('t')
  .description('构建测试环境产品')
  .option('-p, --prod [product ID]', '产品ID')
  .action(option => {
    let prod = option.prod;
    let promps = [];
    const products = getProducts();
    let inProd = false;
    if (prod) {
      inProd = products.some(p => {
        return p.id + '' === prod + ''
      });
      if (!inProd) {
        console.log('产品ID[' + prod + ']不存在')
      }
    }
    if (!prod || !inProd) {
      let choices = [];
      choices.push({name: '所有产品', value: 'all'});
      products.forEach(p => {
        choices.push({name: p.name, value: p.value});
      });
      promps.push({
        type: 'list',
        name: 'productId',
        message: '请选择想要构建的产品ID',
        choices: choices
      })

      inquirer.prompt(promps).then(function (answers) {
        const productId = answers.productId;
        buildTest(productId);
        console.log(answers)
      })
    } else {
      buildTest(prod);
    }
  });

// 解析命令行
program.parse(process.argv);
