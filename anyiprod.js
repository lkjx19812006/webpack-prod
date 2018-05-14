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
  // webpack server
  const serve = require('webpack-serve');
  const config = require('./build/anyiprod.dev.conf.js');
  config.entry = entry;
  config.plugins.push.apply(config.plugins, plugins);
  if (products.length === 1) {
    config.serve.open = {
      path: products[0].filename
    }
  }

  /* // 设置 history模式
  const history = require('connect-history-api-fallback')
  // 用于把请求代理转发到其他服务器的中间件。具体自行搜索
  const proxy = require('http-proxy-middleware')
  // koa 中间件必须
  const convert = require('koa-connect');
  const envConfig = require('./config/index');
  const cfg = envConfig['development'];
  let rewrites = products.map(p => {
    const from = '/' + p.filename.replace(/index\.html$/, '');
    return {
      from: new RegExp(from),
      to: (context) => {
        return context.match[0] + 'index.html';
      }
    }
  });

  config.serve.add = (app, middleware, options) => {
    if (cfg.proxyTable) {
      Object.keys(cfg.proxyTable).forEach((p) => {
        app.use(convert(proxy(p, cfg.proxyTable[p])))
      })
    }
    app.use(convert(history({
      rewrites: rewrites
    })));
  }; */
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

// 解析命令行
program.parse(process.argv);
