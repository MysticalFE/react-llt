import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./AnimationTrans.scss";

class AniTransition extends Component {
  static defaultProps = {
    type: "fade",
    show: true,
    timeout: 500,
    tag: "null",
    key: null
  };
  render() {
    const { type, show, timeout, tag, key } = this.props;
    return (
      <TransitionGroup component={tag}>
        <CSSTransition
          component={tag}
          timeout={timeout}
          classNames={type}
          unmountOnExit
          appear={true}
          key={key}
        >
          {this.props.children}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default AniTransition;
