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
$ yarn add electron react react-dom webpack babel-loader @babel/core @babel/preset-env @babel/preset-react

# install Material UI package
$ yarn add @material-ui/core
```

***

## Structure

```bash
./
|_ public/ # Webpack出力先ディレクトリ
|   |_ (index.js) # WebpackでバンドルされたJSファイル
|   |_ index.html # フロント画面
|
|_ src/ # Webpackソーススクリプト格納ディレクトリ
|   |_ index.jsx # Webpackでバンドルされるエントリーポイント
|
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
    <script src="./index.js"></script>
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
    pathname: path.join(__dirname, 'public', 'index.html'),
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
    "start": "webpack --watch --watch-poll & electron main.js"
  }
}
```

***

## Electron開発

Webpack + React でフロント画面を開発し、Electron で画面を描画する

```bash
# webpack --watch --watch-poll & electron main.js
## webpack --watch --watch-poll: ソースファイル変更を検知して自動的にバンドル実行
### & でつなげることで webpack 監視バンドルをバックグラウンド実行
## electron main.js: Electron で main.js を実行
$ yarn start
```

Electron ではファイル変更時に画面を自動的にリロードできないため `Ctrl + R` で画面を更新する必要がある（Webpack 自体はファイル変更を検知して自動的にバンドルを実行する）
