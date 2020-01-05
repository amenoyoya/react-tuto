import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

// コンポーネントを定義
export default class App extends React.Component {
  render () {
    return (
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    )
  }
}

// DOMを書き換え
ReactDOM.render(
  <App />,
  document.getElementById('root')
)