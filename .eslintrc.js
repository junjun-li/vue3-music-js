module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 0 表示关闭，1 表示警告，2 表示严重错误
    // 0 = off, 1 = warn, 2 = error
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭没有使用的变量警告
    'no-unused-vars': 'off',
    // 关闭对象的属性不能使用引号包裹
    'quote-props': 'off',
    // 可以使用反引号, 不强制使用单引号
    'quotes': 'off',
    // if else在新行
    'brace-style': 'off'
  }
}
