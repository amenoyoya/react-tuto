import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Squareコンポーネント｜クリック可能なマス
 * - Usage: <Square />
 */
class Square extends React.Component {
    // コンストラクタ
    constructor(props) {
        super(props); // React.Componentのコンストラクタを呼ぶ
        // 状態として value を持つ
        this.state = {
            value: null,
        };
    }
    
    render() {
        // クリック時に this.state.value = 'X' を設定
        return (
            <button
                className="square"
                onClick={() => this.setState({value: 'X'})}
            >
                {this.state.value}
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
        return <Square value={i} />;
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
