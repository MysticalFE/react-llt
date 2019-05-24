import React, { Component } from 'react'
import Fetch from 'services/fetch'
// import Footer from 'layouts/Footer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.getData()
  }
  getData = () => {
    Fetch(
      '/api?format=json&v=v1&method=category.itemCategory'
    ).then(res => {
      console.log(res)
    })
    
  }
  render() {
    return (
      // <Footer />
      <div>shouye</div>
    )
  }
}

export default Home