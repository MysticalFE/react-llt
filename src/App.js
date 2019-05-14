import React, { Component } from 'react'

class App extends Component {
  render() {
    const arr = ['a', 'b', 'c']
    return (
      <div>
        <h1>app component</h1>
        <ul>
          {
            arr.map((name, index) => (<li key={index}>{name}</li>))
          }
        </ul>
      </div>
    )
  }
}

export default App