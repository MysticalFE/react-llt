import React, { Component, Children, cloneElement, Fragment } from "react";
import { getClient } from "utils/dom";
import "./Carousel.scss";

class Carousel extends Component {
  static defaultProps = {
    autoplay: true,
    loop: true,
    dots: true,
    dotsClickable: true,
    speed: 300,
    activeIndex: 1,
    touch: true,
    widthZoom: 1,
    delay: 3000
  };

  constructor(props) {
    super(props);
    this.width = getClient().width * props.widthZoom;
    this.state = {
      activeIndex: 1,
      x: -this.width
    };
  }
  componentDidMount() {
    const { children } = this.props;
    if (this.props.autoplay) this.startAutoPlay();
  }
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    this.clearAutoPlay();
    this.setState = (state, callback) => {
      return;
    };
  }
  getCurrentSlide(index) {}
  slideTo(index) {
    this.setState({
      activeIndex: index !== this.count ? index + 1 : 0,
      x: -this.width * index
    });
  }
  slideNext() {
    let { activeIndex } = this.state;
    // activeIndex++;
    this.slideTo(activeIndex);
  }
  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.slideNext();
    }, this.props.delay);
  }
  clearAutoPlay = () => {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  };
  transitionEnd = () => {};
  render() {
    const { speed, children, loop } = this.props;
    this.count = children.length;
    const { x, activeIndex } = this.state;
    const childStyles = { width: this.width };
    let firstElement, lastElement;
    const listStyles = {
      width: this.width * (this.count + 2),
      transform: `translate3d(${x}px, 0, 0)`,
      transition: `transform ${speed}ms ease`
    };
    if (this.count > 1) {
      firstElement = (
        <div className="swiper-list-item" style={{ ...childStyles }}>
          {cloneElement(children[0], {})}
        </div>
      );
      lastElement = (
        <div className="swiper-list-item" style={{ ...childStyles }}>
          {cloneElement(children[this.count - 1], {})}
        </div>
      );
    }
    const dealedChildren = Children.map(children, (child, index) => {
      return cloneElement(
        <div
          className="swiper-list-item"
          key={index}
          style={{ ...childStyles }}
        >
          {child}
        </div>,
        {}
      );
    });
    return (
      <div className="swiper-wrap">
        <div className="swiper-list-wrap">
          <div className="swiper-list" style={{ ...listStyles }}>
            {this.count <= 1 ? (
              dealedChildren
            ) : (
              <Fragment>
                {lastElement}
                {dealedChildren}
                {firstElement}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
