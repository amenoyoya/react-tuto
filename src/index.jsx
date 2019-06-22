import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square関数コンポーネント｜クリック可能なマス
 * - Usage: <Square />
 */
function Square(props) {
    // クリック時に 親コンポーネントからprops経由で渡される onClick を実行
    // 親コンポーネントからprops経由で渡される value を表示
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/**
 * Boardコンポーネント｜3ｘ3のSqureコンポーネントから成るゲーム盤
 * - Usage: <Board />
 */
class Board extends React.Component {
    // コンストラクタ
    constructor(props) {
        super(props);
        // 3ｘ3のSquareの状態を保持する
        this.state = {
            squares: Array(9).fill(null),
            // 次の手番が"X"かどうかの状態を保持
            xIsNext: true
        };
    }

    // 各Squareを描画するメソッド
    renderSquare(i) {
        // Square の onClick イベントで Board.handleClickメソッドを呼び出す
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    // 各Squareクリック時: squares[i] の状態（"O" | "X" | null）を変更
    handleClick(i) {
        /**
         * squares[i]の値を直接書き換え（ミューテート）しないようにして、
         * 以下のようにコピー（slice）に変更を加えてから setState した方が良い（イミュータビリティ）
         */
        const squares = this.state.squares.slice();
        // 勝敗がついている場合や、すでに着手済みのマスの場合は、着手不可とする
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // xIsNextの値からマスに書き込む値（"O" | "X"）を決定
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // 着手の度にxIsNextの値を反転
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        // 勝者判定
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            // 勝敗がついている場合は、勝者を表示
            status = 'Winner: ' + winner;
        } else {
            // 未決着なら、次の着手プレイヤーを表示
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

/**
 * ゲーム勝者判定関数
 * WHEN: 一つのラインが同じ状態（"O" | "X"）
 *   - 一つのライン:
 *     - 横ライン:   [i*3+0, i*3+1, i*3+2] for i in [0..2]
 *     - 縦ライン:   [i+0, i+3, i+6] for i in [0..2]
 *     - 斜めライン: [0, 4, 8], [2, 4, 6]  
 * THEN: その状態（"O" | "X"）を返す
 * ELSE: nullを返す
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b]
            && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

// ========== main ==========
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
