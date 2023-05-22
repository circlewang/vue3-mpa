/*
 * @Author: wangmengyuan
 * @Date: 2023-05-22
 * @LastEditors: wangmengyuan
 * @LastEditTime: 2023-05-22
 * @FilePath: /vue3-mpa/.eslintrc.cjs
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', './.eslintrc-auto-import.json'],
  settings: {
    'import/resolver': {
      alias: {
        map: {
          '@': './src'
        }
      }
    }
  },
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 0, //解决报错：Require statement not part of import statement.
    'vue/multi-word-component-names': 'off', //关闭组件命名规则娇艳
    'prettier/prettier': 'error'
  },
  root: true
}
