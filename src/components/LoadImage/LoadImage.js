import React, { Component } from "react";
import "./LoadImage.scss";

class LoadImage extends Component {
  componentDidMount() {}
  render() {
    return <div>正常的</div>;
  }
}

class IntersectionObserverImage extends Component {
  render() {
    return <div />;
  }
}
export { LoadImage, IntersectionObserverImage };
