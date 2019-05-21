import React, { Component } from 'react'
import ReactDom from 'react-dom'
import 'assets/style/reset.scss'
import 'assets/style/index.scss'
import AppRouter from 'router/index'

class App extends Component {
  render() {
    return <AppRouter/>
  }
}

export default App