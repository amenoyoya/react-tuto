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