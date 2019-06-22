# React｜チュートリアル

## Tutorial (3H)

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

---

### データをProps経由で渡す
Boardコンポーネントから Squareコンポーネントにデータを渡してみる

Boardの`renderSquare`メソッド内で、propsとして`value`変数の値を Squareに渡すようにコードを変更する

- **src/index.jsx**
    ```diff
    class Square extends React.Component {
        render() {
            return (
            <button className="square">
    -            {/* TODO */}
    +            {this.props.value}
            </button>
            );
        }
    }
    ```

    ```diff
    class Board extends React.Component {
        renderSquare(i) {
    -        return <Square />;
    +        return <Square value={i} />;
        }
    ```

![変更後](./screenshot/04.props.png)

---

### インタラクティブなコンポーネントを作る
Squareコンポーネントがクリックされた場合に “X” と表示されるようにする

まず、Squareコンポーネントの`render`メソッドから返されているボタンタグを、以下のように変更する

- **src/index.jsx**
    ```diff
    class Square extends React.Component {
        render() {
            return (
    -            <button className="square">
    +            <button className="square" onClick={() => alert('click')}>
                    {this.props.value}
                </button>
            );
        }
    }
    ```

ここでSquareをクリックすると、ブラウザでアラートが表示されるはず

- 補足:
    - `onClick={() => alert('click')}` と記載したときに `onClick`プロパティに渡しているのは関数であることに注意
    - React はクリックされるまでこの関数を実行しない
    - `() =>` を書くのを忘れて `onClick={alert('click')}` と書いてしまうと、コンポーネントが再レンダーされるたびにアラートが表示されてしまう

次のステップとして、Squareコンポーネントに自分がクリックされたことを「覚えさせ」て、“X”マークでマスを埋めるようにさせる

コンポーネントが何かを「覚える」ためには、`state`プロパティを使う

Reactコンポーネントはコンストラクタで `this.state` を設定することで、状態を持つことが可能になる

- **src/index.jsx**
    ```diff
    class Square extends React.Component {
    +    // コンストラクタ
    +    constructor(props) {
    +        super(props); // React.Componentのコンストラクタを呼ぶ
    +        // 状態として value を持つ
    +        this.state = {
    +            value: null,
    +        };
    +    }
    ```

次に Squareの`render`メソッドを書き換えて、クリックされた時に`state`の現在値を表示するように変更する

- **src/index.jsx**
    ```diff
    class Square extends React.Component {
        // 〜省略〜
        render() {
            // クリック時に this.state.value = 'X' を設定
            return (
    -           <button className="square">
    +           <button
    +               className="square"
    +               onClick={() => this.setState({value: 'X'})}
    +           >
    -               {this.props.value}
    +               {this.state.value}
                </button>
            );
        }
    }
    ```
    - `<button>`タグ内の `this.props.value` を `this.state.value` に置き換える
    - `onClick={...}` というイベントハンドラを `onClick={() => this.setState({value: 'X'})}` に書き換える
    - 可読性のため、`className`と`onClick`のプロパティをそれぞれ独立した行に配置


---

### Stateのリフトアップ
ここまでで三目並べゲームの基本的な部品が揃ったが、完全に動作するゲームにするためには、以下の機能を実装する必要がある

- 盤面に “X” と “O” を交互に置けるようにする
- どちらのプレーヤが勝利したか判定できるようにする

現時点では、それぞれのSquareコンポーネントがゲームの状態を保持しているが、どちらが勝利したかチェックするために、9個のマス目の値を1カ所で管理するように変更する

そのために、ゲームの状態を各Squareの代わりに親のBoardコンポーネントで保持し、BoardからSquareに`props`を渡すようにする

このように `state`を親コンポーネントにリフトアップすることは Reactコンポーネントのリファクタリングでよくあるベストプラクティスの一つである

- **src/index.jsx**
    ```diff
    class Board extends React.Component {
    +    // コンストラクタ
    +    constructor(props) {
    +        super(props);
    +        // 3ｘ3のSquareの状態を保持する
    +        this.state = {
    +            squares: Array(9).fill(null),
    +        };
    +    }
    ```
    - 後で盤面が埋まっていくと、`this.state.squares`配列は以下のような感じになる
        ```javascript
        [
            'O', null, 'X',
            'X', 'X', 'O',
            'O', null, null,
        ]
        ```

さらに `renderSquare`メソッドを修正し、各Squareの状態（"O" | "X" | null）を表示するようにする

- **src/index.jsx**
    ```diff
    renderSquare(i) {
    -    return <Square value={i} />;
    +    return <Square value={this.state.squares[i]} />;
    }
    ```

次に、Squareがクリックされた時の挙動を変更する

- 現在、どのSquareに何が入っているのかを管理しているのはBoardコンポーネント
    - => Square が Board の `state` を更新できるようにする必要がある
- `state`はそれを定義しているコンポーネント内でプライベートなものなので、Square から Board の `state` を直接書き換えることはできない
    - => `state`の代わりに Board から Square に**関数**を渡すことにする
    - => マス目がクリックされた時に Square にその関数を呼んでもらう

以上の設計を実装すると、以下のようになる

- **src/index.jsx**
    ```diff
    renderSquare(i) {
    -   return <Square value={this.state.squares[i]} />;
    +   // Square の onClick イベントで Board.handleClickメソッドを呼び出す
    +   return (
    +       <Square
    +           value={this.state.squares[i]}
    +           onClick={() => this.handleClick(i)}
    +       />
    +   );
    }
    ```
    - 補足:
        - DOM要素である `<button>` は組み込みコンポーネントのため、`onClick`属性はReactにとって特別な意味を持っている
        - Reactでは、イベントを表す `props` には `on[Event]` という名前、イベントを処理するメソッドには `handle[Event]` という名前を付けるのが慣習となっている


現在、Board から Square には `props` として `value`, `onClick` の2つの値を渡している

`onClick`プロパティはマス目がクリックされた時に Square が呼び出すためのものであるため、Square に以下のような変更を加える

- Square の `render`メソッド内の `this.state.value` を `this.props.value` に書き換える
- Square の `render`メソッド内の `this.setState()` を `this.props.onClick()` に書き換える
- Square はゲームの状態を管理しなくなったため `constructor` を削除する

以上の変更を行うと、Squareコンポーネントは以下のようになる

- **src/index.jsx**
    ```diff
    class Square extends React.Component {
    -   constructor(props) {
    -       super(props);
    -       this.state = {
    -           value: null,
    -       };
    -   }

        // クリック時に 親コンポーネントからprops経由で渡される onClick を実行
        // 親コンポーネントからprops経由で渡される value を表示
        render() {
            return (
                <button
                    className="square"
    -               onClick={() => this.setState({value: 'X'})}
    +               onClick={() => this.props.onClick()}
                >
    -               {this.state.value}
    +               {this.props.value}
                </button>
            );
        }
    }
    ```

まだ `handleClick` を定義していないため、マス目をクリックしようとするとエラーが出る

そのため、Boardコンポーネントに `handleClick`メソッドを定義する

- **src/index.jsx**
    ```diff
    class Board extends React.Component {
    +   // 各Squareクリック時: squares[i] の状態（"O" | "X" | null）を変更
    +   handleClick(i) {
    +       /**
    +        * squares[i]の値を直接書き換え（ミューテート）しないようにして、
    +        * 以下のようにコピー（slice）に変更を加えてから setState した方が良い（イミュータビリティ）
    +        */
    +       const squares = this.state.squares.slice();
    +       squares[i] = 'X';
    +       this.setState({squares: squares});
    +   }
    ```
    - **イミュータビリティ（不変性）の重要性:**
        1. 複雑な機能が楽になる
            - このチュートリアルの後の部分で、三目並べの着手の履歴を振り返って以前の着手まで「巻き戻し」ができる「タイムトラベル」機能を実装するが、直接的なデータのミューテートを避けることで、ゲームの以前のヒストリを後で再利用することが可能となる
        2. 変更の検出
            - ミュータブルなオブジェクトは中身が直接書き換えられるため、変更があったかどうかの検出が困難
            - ミュータブルなオブジェクト変更の検出のためには、以前のコピーと比較してオブジェクトツリーの全体を走査する必要があるため、効率が悪い
            - イミュータブルなオブジェクトでの変更の検出は簡単
                - => 参照しているイミュータブルなオブジェクトが前と別のものであれば、変更があったということになる
        3. Reactの再レンダータイミングの決定
            - イミュータブルなオブジェクトは、Reactで **pure component** を構築しやすくなる
            - イミュータブルなデータは変更があったかどうか簡単に分かるため、コンポーネントをいつ再レンダーすべきなのか決定しやすくなる
