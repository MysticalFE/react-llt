import React from 'react'
import ReactDom from 'react-dom'
import 'assets/style/reset.scss'
import 'assets/style/index.scss'
import App from './src/app'



ReactDom.render(
  <App/>,
  document.querySelector('#root')
);