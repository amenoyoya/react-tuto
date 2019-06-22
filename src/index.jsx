import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Squareコンポーネント｜クリック可能なマス
 * - Usage: <Square />
 */
class Square extends React.Component {
    // クリック時に 親コンポーネントからprops経由で渡される onClick を実行
    // 親コンポーネントからprops経由で渡される value を表示
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
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
        squares[i] = 'X';
        this.setState({squares: squares});
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
