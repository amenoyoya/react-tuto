/**
 * React状態管理
 * @state int count
 * @action button.onclick => count をインクリメント
 * @view p.text: 現在のカウンタ $count
 */
import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';

/**
 * インラインスタイル
 */
const style = {
  fontSize: '16px',
  margin: '2.4rem auto',
  display: 'block',
  width: '80%',
};

/**
 * classコンポーネント: React.Componentを継承し、renderメソッドでReactDOMを返す
 */
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    // state準備
    this.state = {
      count: 0
    };
  }

  // button.onclick 時アクション
  onclick() {
    // stateを更新する場合は setState メソッドを使う
    this.setState({count: this.state.count + 1});
  }

  // 描画
  render() {
    return (
      <div style={style}>
        <p>現在のカウンタ: {this.state.count}</p>
        <button onClick={() => this.onclick()}>Count</button>
      </div>
    );
  }
}

/**
 * 関数コンポーネント: propsを受け取り、ReactDOMを返す
 */
const FuncComponent = () => {
  /**
   * useState(初期値) => 状態, 状態更新関数（フック）
   */
  const [count, setCount] = useState(0);

  // button.onclick 時アクション
  const onclick = () => {
    setCount(count + 1);
  }

  return (
    <div style={style}>
      <p>現在のカウンタ: {count}</p>
      <button onClick={onclick}>Count</button>
    </div>
  );
}

export default (props) => {
  // react-helmetでmetaタグ設定可能
  return (
    <section>
      <Helmet>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>React状態管理</title>
      </Helmet>
      <ClassComponent />
      <hr/>
      <FuncComponent />
    </section>
  );
}