import React, { Component } from 'react'
import Fetch from 'services/fetch'
// import Footer from 'layouts/Footer'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    const res = await Fetch('/api?format=json&v=v1&method=category.itemCategory')
    console.log(res)
    
  }
  render() {
    return (
      // <Footer />
      <div>category</div>
    )
  }
}

export default Home