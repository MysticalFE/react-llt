import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Footer from 'layouts/Footer'
const Home = React.lazy(() => import('pages/Home'))

class Routers extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Suspense fallback={<div>loading...</div>}>
            <Route path="/home" component={Home} />
            <Route path="/" exact={true} component={Home} />
          </Suspense>
          <Switch>
            <Route path="/home" component={Footer} />
            <Route path="/" exact={true} component={Footer} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default Routers