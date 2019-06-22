# React｜チュートリアル

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

![screenshot](./screenshot/03.index.png)
