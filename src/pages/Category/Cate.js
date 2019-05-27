import React, { Component } from 'react'
import Fetch from 'services/fetch'
import cs from 'classnames'
import './Cate.scss'
// import Footer from 'layouts/Footer'

class Catetory extends Component {
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
      <div className="cate-wrap">
        <div className="cate-header">
          <div className="cate-title">搜索</div>
          <div className="cate-input-wrap">
            <div className="cate-input-cantent">
              <span className="icon icon-ic_sousuo"></span>
              <span>点击进行搜索</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Catetory