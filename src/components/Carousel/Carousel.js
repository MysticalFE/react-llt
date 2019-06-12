import React, { Component } from "react";
import { getClient } from "utils/dom";
import "./Carousel.scss";

class Carousel extends Component {
  static defaultProps = {
    autoplay: true,
    loop: true,
    dots: true,
    dotsClickable: true,
    speed: 300,
    activeIndex: 0,
    touch: true,
    widthZoom: 1,
    delay: 3000
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.activeIndex !== prevState.activeIndex) {
  //     return {
  //       activeIndex: nextProps.activeIndex
  //     };
  //   }
  //   return null;
  // }
  constructor(props) {
    super(props);
    console.log(props);
    this.width = getClient().width * props.widthZoom;
    this.state = {
      activeIndex: 0,
      x: 0
    };
  }
  componentDidMount() {
    const { children } = this.props;
    if (this.props.autoplay) this.startAutoPlay();
    this.count = children.length;
  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.slideTo(this.props.activeIndex);
  // }
  getCurrentSlide(index) {
    if (index < 0) {
      index = 0;
    } else {
      index = index % this.count;
    }
    return index;
  }
  slideTo(index) {
    if (this.props.loop) {
      index = this.getCurrentSlide(index);
    }
    this.setState({
      x: -this.width * index,
      activeIndex: index
    });
  }
  slideNext() {
    let { activeIndex } = this.props;
    activeIndex++;
    this.slideTo(activeIndex);
  }
  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.slideNext();
    }, this.props.delay);
  }
  clearAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  transitionEnd = () => {
    let { activeIndex } = this.state;
    if (activeIndex < 0) {
      activeIndex = this.count - 1;
    } else if (activeIndex >= this.count - 1) {
      activeIndex = 0;
    }
    this.slideTo(activeIndex);
    if (this.props.autoplay) {
      this.startAutoPlay();
    }
  };
  render() {
    const { speed, children, loop } = this.props;
    const { x, activeIndex } = this.state;
    const childStyles = { width: this.width };
    console.log(x);
    const listStyles = {
      transform: `translate3d(${x}px, 0, 0)`,
      transition: `transform ${speed}ms ease`
    };
    const dealedChildren = children.map((item, index) => {
      let left = index * this.width;
      if (loop && this.count >= 2) {
        if (
          this.count == activeIndex + 1 &&
          index === 0 &&
          index !== activeIndex
        ) {
          left = this.width * (this.count - 1);
        } else if (activeIndex <= 0 && index === this.count - 1) {
          left = -this.width * (this.count - 1);
        }
        childStyles.transform = `translate3d(${left}px, 0, 0)`;
      }
      return (
        <div
          className="swiper-list-item"
          index={index}
          key={index}
          style={{ ...childStyles }}
        >
          {item}
        </div>
      );
    });
    return (
      <div className="swiper-wrap">
        <div className="swiper-list-wrap">
          <div
            className="swiper-list"
            style={{ ...listStyles }}
            onTransitionEnd={this.transitionEnd.bind(this)}
          >
            {dealedChildren}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
