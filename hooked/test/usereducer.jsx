/**
 * 複雑な状態管理
 * @state int count
 * @action button.onclick (action) => {
 *   action.increment => state.count++
 *   action.decrement => state.count--
 * }
 */
import {Helmet} from 'react-helmet-async'
import { useReducer } from 'react'

const style = {
  fontSize: '16px',
  margin: '20px auto',
  width: '80%',
}
const btn = {
  appearance: 'none',
  border: 0,
  borderRadius: '5px',
  background: '#4676D7',
  color: '#fff',
  padding: '8px 16px',
  margin: '5px 20px',
  fontSize: '20px',
}

/**
 * useReducer に渡す reducer: 状態 + アクション => 処理 => 状態’ の整理処理を行う関数
 * ※ なぜ reducer と呼ばれるか: https://shgam.hatenadiary.jp/entry/2018/11/10/004819
 * @param {*} state 現在の状態
 * @param {*} action 実行するアクション
 * @return {*} state2 次の状態
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      throw new Error()
  }
}

export default () => {
  /**
   * useReducer: (reducer関数, 初期state) => 状態変数, 状態更新関数
   */
  const [state, dispatch] = useReducer(reducer, {count: 0})
  return (
    <section style={style}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>React状態管理 | reducer による複雑なアクション</title>
      </Helmet>
      <p>Count: {state.count}</p>
      <button style={btn} onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button style={btn} onClick={() => dispatch({type: 'increment'})}>+</button>
    </section>
  )
}