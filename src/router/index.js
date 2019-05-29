import React, { Component, Suspense, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Loading from "components/Loading";
import Footer from "layouts/Footer";
import AniTransition from "components/AnimationTransition";
const Home = React.lazy(() => import("pages/Home"));
const Category = React.lazy(() => import("pages/Category"));

class Routers extends Component {
  render() {
    const { location } = this.props;
    return (
      <AniTransition type="fade" tag="section" key={location.pathname}>
        <Fragment>
          <Suspense fallback={<Loading />}>
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/" exact={true} component={Home} />
          </Suspense>
          <Switch location={location}>
            <Route path="/home" component={Footer} />
            <Route path="/category" component={Footer} />
            <Route path="/" exact={true} component={Footer} />
          </Switch>
        </Fragment>
      </AniTransition>
    );
  }
}

export default withRouter(Routers);
