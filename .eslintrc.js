/**
 * ESLint configuration
 * @flow
 **/

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:react/recommended',
    'prettier'
  ],
  'env': {
    'es6': true,
    'jest': true,
    'jest/globals': true,
    'react-native/react-native': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 10,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'flowtype',
    'jest',
    'prettier',
    'react',
    'react-native'
  ],
  'rules': {
    'no-var': 2,
    'no-loop-func': 'error',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'semi': [
      2,
      'always'
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        arrowParens: 'always',
        singleQuote: true,
        jsxSingleQuote: true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false
      }
    ],
    'react/prop-types': 0,
  }
};
