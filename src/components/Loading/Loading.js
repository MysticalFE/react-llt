import React, { Component } from "react";
import cs from "classnames";
import "./Loading.scss";

class Loading extends Component {
  static defaultProps = {
    width: 35,
    height: 15,
    type: "line-bounce",
    color: "#303548",
    defaultClass: "loading"
  };
  //循环获取loading span
  getChildEle(type) {
    const { color } = this.props;
    let spans = [],
      num = 5;
    for (let i = 0; i < num; i++) {
      spans.push(
        <span
          key={i}
          style={{ height: this.props.height, background: color }}
        />
      );
    }
    return <div className={cs("loader", type)}>{spans}</div>;
  }
  //get height width
  getSize() {
    const { width, height } = this.props;
    return { width, height };
  }
  render() {
    const { className, type, defaultClass, ...rest } = this.props;
    const restParams = Object.assign(rest, {
      height: rest.height,
      width: rest.width
    });
    return (
      <div
        className={cs(defaultClass, this.props.className)}
        style={{ ...this.getSize() }}
        {...restParams}
      >
        {this.getChildEle(type)}
      </div>
    );
  }
}

export default Loading;
