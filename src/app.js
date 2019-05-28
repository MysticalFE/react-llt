import React, { Component } from "react";
import ReactDom from "react-dom";
import "assets/style/reset.scss";
import "assets/style/index.scss";
import AppRouter from "router/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <TransitionGroup>
        <CSSTransition
          timeout={500}
          classNames="fade"
          unmountOnExit
          appear={true}
        >
          <AppRouter />
        </CSSTransition>
      </TransitionGroup>
    );
    // return <AppRouter />;
  }
}

export default App;
