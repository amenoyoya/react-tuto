# Electron + React

## Environment

- OS:
    - Ubuntu 18.04
- Node.js: 13.2.0
    - Yarn: 1.21.0

***

## Installation

```bash
# initialize project
## -y: 対話をスキップしデフォルト値で初期化
$ yarn init -y

# install packages
$ yarn add electron react react-dom webpack webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react
```

***

## Structure

```bash
./
|_ dest/ # Webpack出力先ディレクトリ
|   |_ (index.js) # WebpackでバンドルされたJSファイル
|
|_ src/ # Webpackソーススクリプト格納ディレクトリ
|   |_ index.jsx # Webpackでバンドルされるエントリーポイント
|
|_ index.html # フロント画面
|_ main.js # Electronソーススクリプト
|_ package.json # プロジェクト構成設定
|_ webpack.config.js # Webpackバンドル設定
```

### webpack.config.js
```javascript
const path = require('path');

module.exports = {
  mode: 'development', // 'production'
  // ソーススクリプト: ./src/index.jsx
  entry: './src/index.jsx',
  // 出力先: ./dest/index.js
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dest')
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
  // 開発サーバー設定
  devServer: {
    // 起点ディレクトリを ./ に設定
    contentBase: __dirname,
    // ポートを3000に設定
    port: 3000,
    // ブラウザを自動的に開く
    open: true
  }
};
```

### src/index.jsx
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

// コンポーネントを定義
export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Test</h1>
      </div>
    )
  }
}

// DOMを書き換え
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
    <!-- id: root の要素を React で制御 -->
    <div id="root"></div>
    <!-- Webpack でバンドルしたJSファイルを読み込む -->
    <script src="./dest/index.js"></script>
</body>
</html>
```

### main.js
```javascript
// Electronの実行に必要なモジュールを取り込む
const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Electronのライフサイクルを定義
let mainWindow // メインウィンドウを表す変数
app.on('ready', createWindow)
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

// ウィンドウを作成してコンテンツを読み込む
function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({ // 読み込むコンテンツを指定
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true  
  }))
  // ウィンドウが閉じる時の処理
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}
```

### package.json
```json
{
  (略)
  "scripts": {
    "server": "webpack-dev-server --hot",
    "start": "webpack && electron main.js"
  }
}
```

***

## 開発

Webpack開発サーバを用いてフロント画面（React）を開発する

```bash
# webpack-dev-server --hot
$ yarn server
```

http://localhost:3000 で開発サーバが稼働する

***

## Electron実行

Webpackでフロント画面（React）をバンドルし、Electron（`main.js`）を実行する

```bash
# webpack && electron main.js
$ yarn start
```
