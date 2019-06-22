# React｜チュートリアル

## Environment

- OS: Ubuntu 18.04
- CLI:
    - nodejs: `10.15.3`
        - n (バージョン管理ツール): `4.1.0`
        - yarn (パッケージマネージャ): `1.16.0`
        - webpack (モジュールハンドラー): `4.35.0`
            - webpack-cli: `3.3.4`
            - webpack-dev-server: `3.7.2`
- Framework:
    - React: `3.0.1`

***

## Setup (0.25H)

### Install CLI Tools
```bash
# install nodejs
$ sudo apt install -y nodejs npm
$ sudo npm install -g n # Install n-install on global
$ sudo n stable # Install stable nodejs by using n-install
$ sudo apt purge -y nodejs npm # Remove old nodejs and npm
$ sudo apt autoremove -y

# install yarn on global
$ sudo bpm install -g yarn

# show versions
$ n --version
4.1.0

$ nodejs -v
10.15.3

$ yarn -v
1.16.0
```

***

## webpack導入 (0.25H)

### What's webpack?
- 複数のJavaScriptを1つにまとめることが可能
    - JS以外にも、CSSや画像もバンドル可能
- JavaScriptの元々の機能にはないモジュール機能を提供
    - 標準仕様(ECMAScript)の ES Modules が使用可能
    - node_modulesのモジュールを結合可能
- プラグインを使うことで、SassをコンパイルしたりAltJSをトランスコンパイルしたりすることも可能

---

### Install webpack
```bash
# install webpack, webpack-cli on local
$ yarn add -D webpack webpack-cli
```

---

### Configure webpack
`webpack.config.js`を作成し、以下のように設定する

```javascript
const path = require('path');

module.exports = {
    // 実行モード: develop => 開発, production => 本番
    // webpack4系以降はmodeを指定しないと警告が出る
    mode: 'development',
    // エントリーポイント
    entry: './src/index.js',
    // 出力設定
    output: {
        // バンドル後のファイル名
        filename: 'bundle.js',
        // 出力先のパス（※絶対パスで指定すること）
        path: path.join(__dirname, 'public')
    }
};
```

---

### Get started
動作確認のため、エントリーポイントに設定した`src/index.js`と、モジュール用の`src/mylib.js`を作成する

- **src/index.js**
    ```javascript
    // モジュール機能を使い mylib.js を読み込む
    import { hello } from "./mylib";

    // mylib.jsに定義されたJavaScriptを実行
    hello();
    ```
- **src/mylib.js**
    ```javascript
    // export文を使ってhello関数を定義
    export function hello() {
        alert("こんにちは！webpack");
    }
    ```

webpackでバンドルする

```bash
$ yarn webpack
# => src/index.js がトランスコンパイルされ public/bundle.js にバンドルされる
```

***

## webpack開発サーバー導入 (0.25H)

### Install webpack-dev-server
```bash
$ yarn add -D webpack-dev-server
```

---

### Configure webpack-dev-server
`webpack.config.js`に開発サーバーの設定を追加し、`package.json`にサーバー起動用のスクリプトを追加する

- **webpack.config.js**
    ```javascript
    module.exports = {
        // 〜省略〜
        // 開発サーバー設定
        devServer: {
            // 起点ディレクトリを public/ に設定
            contentBase: path.join(__dirname, 'public'),
            // ポートを3000に設定
            port: 3000,
            // ブラウザを自動的に開く
            open: true
        }
    };
    ```
- **package.json**
    ```json
    {
        // 〜省略〜
        "scripts": {
            // 開発サーバー起動スクリプト
            "start": "webpack-dev-server"
        }
    }
    ```

---

### Run webpack-dev-server
```bash
# execute `start` script
## => webpack-dev-server
$ yarn start

# => http://localhost:3000 で開発サーバー実行
```

![webpack-dev-server](./screenshot/00.webpack.png)

***

## React導入 (1H)

### What's React?
React
: UIを効率よく構築するためのコポーネントベースJavaScriptライブラリ
JSXというシンタックスで記述されるため、BabelでES5にトランスコンパイルする必要がある

JSX
: DeNAによって開発されたウェブアプリケーション向けのプログラミング言語
JavaScriptのデメリットを解消することを目的に作られており、HTML風の構文を使うことも可能

コンポーネント
: UIを構築するための、小さく独立した部品
UIとは独立しているため、再利用しやすい
コンポーネントを組み合わせることで複雑なUIを作ることも可能

---

### Install React and Babel
```bash
# Reactとトランスコンパイル用のBabelをインストール
$ yarn add -D react react-dom
$ yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

---

### Configure React
`webpack.config.js`にReactトランスコンパイル用の設定を追加する

- **webpack.config.js**
    ```javascript
    module.exports = {
        // 〜省略〜
        // ビルドしたJavaScriptにsource-mapを書き出す
        devtool: 'inline-soruce-map',
        // モジュール設定
        module: {
            rules: [
                {
                    // .js, .jsx ファイルを babel-loader でトランスコンパイル
                    test: /\.js(x?)$/,
                    exclude: /node_modules/, // node_modules/ 内のファイルは除外
                    loader: 'babel-loader',
                    // Babel のオプションを指定
                    options: {
                        // preset_env, react の構文拡張を有効に
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/react"]
                        ]
                    }
                }
            ]
        }
    };
    ```

---

### コンポーネント作成
`React.Component`を継承して`ShoppingList`コンポーネントを作る

- **src/shopping-list.jsx**
    ```javascript
    import React from 'react';

    /**
     * ShoppingListコンポーネント
     * : React.Componentを継承して作成
     * 
     * Usage: <ShoppingList name="Mark" />
     */
    export default class ShoppingList extends React.Component {
        // renderメソッドでコンポーネント内部のHTMLタグを定義
        render() {
            return (
                <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
                </div>
            );
        }
    }
    ```

---

### Reactアプリケーション作成
上記で作成したShoppingListコンポーネントを使って、Webアプリケーションを作成する

- **public/index.html**
    - 開発サーバーのエントリーポイント
    ```html
    <!DOCTYPE html>
    <html lang="ja">
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <!-- Reactにより id="root" の要素が置き換えられる -->
            <div id="root"></div>
            <!-- React + webpack によりバンドルされた bundle.js を読み込む -->
            <script src="./bundle.js"></script>
        </body>
    </html>
    ```
- **src/index.jsx**
    - Reactアプリケーションのエントリーポイント
        - `public/bundle.js`にバンドルされる
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    // ShoppingListコンポーネントを読み込む
    import ShoppingList from './shopping-list.jsx';

    // ReactDOMにより id="root" の要素を <ShoppingList name="Mark" /> に置き換える
    ReactDOM.render(
        <ShoppingList name="Mark" />,
        document.getElementById('root')
    );
    ```

必要なファイルを作成したら `webpack.config.js`を編集し、エントリーポイントを`src/index.jsx`に変更する

- **webpack.config.js**
    ```javascript
    module.exports = {
        // エントリーポイントを src/index.jsx に変更
        entry: './src/index.jsx',
        // 〜省略〜
    }
    ```

開発サーバーを起動し http://localhost:3000 にアクセスする

```bash
$ yarn start
# => .js, .jsx ファイルがBabelによりトランスコンパイル
# => public/bundle.js にバンドルされる
# => http://localhost:3000 で public/index.html が読み込まれる
```

![react-get-started](./screenshot/01.react.png)

##### Error: ENOSPC: System limit for number of file watchers reached, ...
Unix系OSを使っていると、Reactプロジェクトの開発サーバー実行時に上記のエラーが出ることがある

これはファイル監視の上限を超えている場合に出るエラーらしい

以下のコマンドでファイル監視の上限を引き上げれば上手く行くはず

参考: https://stackoverflow.com/questions/50793920/enospc-error-in-create-react-app

```bash
# ファイル監視の上限を524288にする
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

# /etc/sysctl.conf の設定を再読込
$ sudo sysctl -p
```

***

## Tutorial (1.5H)

参考: https://ja.reactjs.org/tutorial/tutorial.html

**三目並べ**を作成する

### 準備

#### チュートリアル用のファイルの準備
チュートリアル用のスタイルシートやスクリプトを準備する

```bash
# srcディレクトリを clean up
$ rm -f src/*
```

- **src/index.css**
    ```css
    body {
        font: 14px "Century Gothic", Futura, sans-serif;
        margin: 20px;
    }

    ol, ul {
        padding-left: 30px;
    }

    .board-row:after {
        clear: both;
        content: "";
        display: table;
    }

    .status {
        margin-bottom: 10px;
    }

    .square {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
    }

    .square:focus {
        outline: none;
    }

    .kbd-navigation .square:focus {
        background: #ddd;
    }

    .game {
        display: flex;
        flex-direction: row;
    }

    .game-info {
        margin-left: 20px;
    }
    ```
- **src/index.jsx**
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';

    /**
     * Squareコンポーネント｜クリック可能なマス
     * - Usage: <Square />
     */
    class Square extends React.Component {
        render() {
            return (
                <button className="square">
                    {/* TODO */}
                </button>
            );
        }
    }

    /**
     * Boardコンポーネント｜3ｘ3のSqureコンポーネントから成るゲーム盤
     * - Usage: <Board />
     */
    class Board extends React.Component {
        renderSquare(i) {
            return <Square />;
        }

        render() {
            const status = 'Next player: X';

            return (
                <div>
                    <div className="status">{status}</div>
                    <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    </div>
                </div>
            );
        }
    }

    /**
     * Gameコンポーネント｜Boardコンポーネントとゲーム情報を表示
     * - Usage: <Game />
     */
    class Game extends React.Component {
        render() {
            return (
                <div className="game">
                    <div className="game-board">
                        <Board />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            );
        }
    }

    // ========== main ==========
    ReactDOM.render(
        <Game />,
        document.getElementById('root')
    );
    ```

#### 開発サーバー実行
最低限のスタイルシート, スクリプトを準備できたら以下のコマンドで開発サーバーを起動する

```bash
$ yarn start
# => http://localhost:3000 で開発サーバー実行
```

![screenshot](./screenshot/02.index.png)
