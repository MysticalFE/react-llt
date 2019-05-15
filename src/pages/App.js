import React, { Component } from 'react'
import llt from '../assets/images/llt.jpg'

class App extends Component {
  render() {
    const arr = ['a', 'b', 'c']
    return (
      <div>
        <h1>app component</h1>
        <img src={llt}/>
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