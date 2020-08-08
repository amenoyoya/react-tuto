/**
 * React状態更新イベント制御
 * @state array<int> counts
 * @state bool style
 *
 * @action li.onclick => state.[count]++
 * @action button.onclick => state.style != state.style
 * @effect state.style.onupdate => console.log('switched')
 */
import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';

/**
 * インラインスタイル
 */
const div = {
  margin: '3rem auto',
  display: 'block',
  width: '80%',
};
const pointer = {
  cursor: 'pointer'
};
const dark = {
  position: 'absolute',
  width: '95%',
  height: 'auto',
  backgroundColor: '#333',
  color: '#eee',
};
const light = {
  position: 'absolute',
  width: '95%',
  height: 'auto',
  backgroundColor: '#eee',
  color: '#333',
};

/**
 * メイン関数コンポーネント
 */
export default (props) => {
  // state準備
  const [counts, setCounts] = useState([0, 1, 2, 3, 4]);
  const [style, setStyle] = useState(false);

  // li.onclick 時イベント
  const onListClick = (index) => {
    // slice で配列コピー
    const newCounts = counts.slice();
    // 指定indexのカウンタ更新
    newCounts[index]++;
    setCounts(newCounts)
  };

  // button.onclick 時イベント
  const onButtonClick = () => {
    setStyle(!style);
  };

  // style state 更新時実行イベント
  useEffect(() => {
    console.log('switched');
  }, [style]);

  // DOM
  return (
    <section style={style? dark: light}>
      <Helmet>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>React状態管理 | ライフサイクルの代替</title>
      </Helmet>
      <div style={div}>
        <ul>
          {counts.map((count, index) => {
            return (
              <li key={index} onClick={() => onListClick(index)}>Button {index + 1}: {count}</li>
            )
          })}
        </ul>
      </div>
      <div style={div}>
        <button onClick={() => onButtonClick()}>スタイル切り替え</button>
      </div>
    </section>
  );
};
