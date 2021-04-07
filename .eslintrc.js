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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭没有使用的变量警告
    'no-unused-vars': 'off',
    // 关闭对象的属性不能使用引号包裹
    'quote-props': 'off',
    // 可以使用反引号, 不强制使用单引号
    'quotes': 'off'

  }
}
