const path = require('path');

module.exports = {
  mode: 'development', // 'production'
  // ソーススクリプト: ./src/index.jsx
  entry: './src/index.jsx',
  // 出力先: ./public/index.js
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public')
  },
  // モジュール設定
  module: {
    rules: [
      // .js, .jsx ファイルを babel-loader でトランスコンパイル
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/, // node_modules/ 内のファイルは除外
        use: [
          // babel-loader を利用
          {
            loader: 'babel-loader',
            options: {
              // @babel/preset-env, @babel/prese-react の構文拡張を有効に
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
    ]
  },
};
