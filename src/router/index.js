import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "components/Loading";
import Footer from "layouts/Footer";
const Home = React.lazy(() => import("pages/Home"));
const Category = React.lazy(() => import("pages/Category"));

class Routers extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/" exact={true} component={Home} />
          </Suspense>
          <Switch>
            <Route path="/home" component={Footer} />
            <Route path="/category" component={Footer} />
            <Route path="/" exact={true} component={Footer} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Routers;
