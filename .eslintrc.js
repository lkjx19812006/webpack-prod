// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 0, // 禁用 console
    'no-empty': 0, // 禁止出现空语句块
    'no-unused-vars': 0, // 禁止出现未使用过的变量
    'no-constant-condition': 0, // 禁止在条件中使用常量表达式
    'no-undef': 0, // 禁用未声明的变量
    'no-trailing-spaces': 0, // 禁用行尾空格,
    'semi': 0, // 要求或禁止使用分号代替 ASI,
    'jsx-quotes': 0
  }
}
