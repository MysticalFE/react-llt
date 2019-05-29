import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "assets/style/reset.scss";
import "assets/style/index.scss";
import AppRouter from "router/index";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
  }
}

export default App;
