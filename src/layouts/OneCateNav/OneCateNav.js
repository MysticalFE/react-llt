import React, { Component, createRef } from "react";
import cs from "classnames";
import "./OneCateNav.scss";
import { Transform } from "stream";

const FIRST_NAV = {
  cat_id: "",
  categoryname: "热门"
};
const TRANSITION = "all 0.5s cubic-bezier(0.33, 0.66, 0.66, 1) 0s";
class OneNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      moveLen: 0
    };
    this.navUl = createRef();
    this.bodyClientWidth = document.body.clientWidth;
  }
  componentWillMount() {
    this.dealData();
  }
  componentDidMount() {
    this.navUlWidth = this.navUl.current.clientWidth;
    this.maxScrollX = this.navUlWidth - this.bodyClientWidth;
  }
  dealData = () => {
    const { data, widget } = this.props;
    this.data = data.filter(item => item.widget == widget);
    this.data[0].params.pic.unshift(FIRST_NAV);
  };
  //点击nav li
  selectedLi = i => {
    const _this = this;
    this.setState(prevState => {
      _this.navTransform(prevState.selectedIndex, i);
      return {
        selectedIndex: i,
        moveLen: _this.moveLeft
      };
    });
  };
  //nav点击居中 逻辑
  navTransform(prevIndex, currentIndex) {
    const itemOffsetLeft = this.navUl.current.children[currentIndex].offsetLeft; //当前点击item offsetLeft
    const liWidth = this.navUl.current.children[currentIndex].clientWidth; //当前点击item width
    let tempMoveLeft = itemOffsetLeft - this.bodyClientWidth / 2 + liWidth / 2; //ul需要移动的距离  tempMoveLeft
    if (currentIndex > prevIndex)
      this.moveLeft =
        tempMoveLeft < this.maxScrollX
          ? tempMoveLeft > 0
            ? -tempMoveLeft
            : 0
          : -this.maxScrollX;
    if (currentIndex < prevIndex) {
      if (tempMoveLeft < this.maxScrollX) {
        //处理最后两个边界情况
        this.moveLeft = tempMoveLeft < 0 ? 0 : -tempMoveLeft;
      }
    }
  }
  //touchstart
  touchStart = e => {
    const _this = this;
    e.nativeEvent.stopImmediatePropagation();
    this.startPos = e.touches[0].pageX;
    this.initX = this.state.moveLen;
    // this.initX = this.navUl.current.style.transform.match(
    //   /\-?[0-9]+\.?[0-9]*/g
    // )[1];
    this.isTouch = true;
  };
  //touchmove
  touchMove = e => {
    const _this = this;
    if (!this.isTouch) return;
    this.moveX = e.touches[0].pageX;
    this.setState({
      moveLen: this.moveX - this.startPos + this.initX
    });
  };
  //touchend
  touchEnd = e => {
    const _this = this;
    this.isTouch = false;
    if (this.state.moveLen < -this.maxScrollX)
      this.setState({ moveLen: -this.maxScrollX });
    if (this.state.moveLen > 0) this.setState({ moveLen: 0 });
  };
  render() {
    const navData = this.data[0].params.pic;
    const handleTouch = {
      onTouchStart: this.touchStart,
      onTouchMove: this.touchMove,
      onTouchEnd: this.touchEnd
    };
    const styles = {
      transform: `translate3d(${this.state.moveLen}px, 0, 0)`,
      transition: TRANSITION
    };
    return (
      <div className="nav-content">
        <ul ref={this.navUl} {...handleTouch} style={{ ...styles }}>
          {navData.map((item, index) => (
            <li
              data-id={item.cat_id}
              key={index}
              onClick={() => this.selectedLi(index)}
            >
              <span
                className={cs({
                  "nav-selected": this.state.selectedIndex == index
                })}
              >
                {item.categoryname}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OneNav;
