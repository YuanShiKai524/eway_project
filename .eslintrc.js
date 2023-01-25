module.exports = {
  extends: [
    'react-app', //  react幫配置好了一些語法，譬如箭頭函數
    'airbnb',
    'plugin:prettier/recommended', // prettier配置
  ],
  rules: {
    'react/jsx-filename-extension': 'off', // 關閉airbnb對於jsx必須寫在jsx文件中的設置
    'react/prop-types': 'off', // 關閉airbnb對於必須添加prop-types的校驗
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 'off', // 關閉要求一個表達式必須換行的要求，和Prettier沖突了
    'react/jsx-wrap-multilines': 0, // 關閉要求jsx屬性中寫jsx必須要加括號，和Prettier沖突了
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline', // 關閉airbnb對函數調用參數，非一行，最後也要加逗號的限制
      },
    ],
    'jsx-a11y/no-static-element-interactions': 'off', // 關閉非交互元素加事件必須加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 關閉click事件要求有對應鍵盤事件
    'no-bitwise': 'off', // 關閉禁用位操作符
    'no-console': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides: [
    {
      files: ['**/Mi/*.js', '**/Mi/*.jsx'],
      rules: {
        'react/prop-types': 'error', // Mi 文件夾下的是系統組件，必須寫prop-types
      },
    },
  ],
};
