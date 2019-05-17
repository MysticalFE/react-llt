import React from 'react'
import ReactDom from 'react-dom'
import 'assets/style/reset.scss'
import 'assets/style/index.scss'
import Home from 'pages/Home/Home'



ReactDom.render(
  <Home/>,
  document.querySelector('#root')
);