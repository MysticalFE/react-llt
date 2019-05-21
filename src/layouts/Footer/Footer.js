import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import cs from 'classnames'
import './Footer.scss'

const tarbar = [
  {
    'icon': 'icon-tab_shouye',
    'active-icon': 'icon-tab_shouye_sele',
    'text': '首页',
    'router': '/home'
  },
  {
    'icon': 'icon-tab_tuijian',
    'active-icon': 'icon-tab_tuijian_sele',
    'text': '推荐',
    'router': '/recommend'
  },
  {
    'icon': 'icon-tab_sousuo',
    'active-icon': 'icon-tab_sousuo_sele',
    'text': '搜索',
    'router': '/search'
  },
  {
    'icon': 'icon-tab_gouwuche',
    'active-icon': 'icon-tab_gouwuche_sele',
    'text': '购物车',
    'router': '/cart'
  },
  {
    'icon': 'icon-tab_wode',
    'active-icon': 'icon-tab_wode-sele',
    'text': '个人中心',
    'router': '/myCenter'
  },
]

// const Home = lazy(() => import('pages/Home/Home'))

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  itemChange = (i) => {
    this.setState({
      index: i
    })
  }
  render() {
    return (
        <div className="bottom-nav">
          <ul>
          {
              tarbar.map((item, i) => (
                <li key={i} onClick={() => this.itemChange(i)}>
                  <Link to={item.router} className={cs({'active': this.state.index === i})}>
                    <i className={cs('icon', {[`${item.icon}`]: this.state.index != i }, {[`${item['active-icon']}`]: this.state.index === i})}></i>
                    <span>{ item.text }</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
    )
  }
}

export default Footer