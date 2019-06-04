import React, { Component, createRef } from "react";
import cs from "classnames";
import AniTransition from "components/AnimationTransition";
import "./CateList.scss";
import { getEleRect, getViewportSize } from "utils/dom";
import { handleImgUrl, toArray } from "utils/util";

function CateLogo(props) {
  return (
    <div>
      {props.logo && (
        <div className="ad-img">
          <img
            data-originsrc={handleImgUrl(props.logo)}
            src={handleImgUrl(props.logo)}
          />
        </div>
      )}
    </div>
  );
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      cateListScrollY: 0,
      cateListHeight: 0
    };
    this.cateList = createRef();
    this.cateRightList = createRef();
    this.cateRightUl = createRef();
  }
  componentDidMount() {
    const listHeight =
      getViewportSize().height -
      getEleRect(".cate-header").height -
      getEleRect(".bottom-nav").height;
    this.setState({
      cateListHeight: `${listHeight}px`
    });
    this.getScrollTops();
    this.cateRightList.current.addEventListener("touchmove", this.scrollEvent);
  }
  scrollEvent = e => {
    const scrollTop = this.cateRightList.current.scrollTop;
    // const listScrollTop =
    //   this.cateRightUl.current.clientHeight - getViewportSize().height;
    this.tops.forEach((item, i) => {
      if (scrollTop >= item && screenTop < this.tops[i + 1]) {
        this.setState({
          index: i
        });
      }
    });
  };
  getScrollTops = () => {
    this.tops = [];
    toArray(this.cateRightUl.current.children).map(item =>
      this.tops.push(item.offsetTop)
    );
  };
  scrollAnti = (end, i, direction) => {
    let startTime = null;
    const animate = timestamp => {
      const start = this.state.cateListScrollY;
      let speed = 55 * i,
        targetStyle = 0,
        progress = 0,
        currentStyle = 0;
      if (!startTime) startTime = timestamp;
      const timeout = timestamp - startTime;
      // console.log(`start${start}`);
      if (Math.abs(end - start) < speed) {
        speed = Math.abs(end - start);
      }

      if (direction == "down") {
        targetStyle = start >= end ? end : start + speed;
        progress = parseInt((speed * timeout) / 10 + start);
        currentStyle = Math.min(progress, parseInt(targetStyle));
      } else {
        targetStyle = start <= end ? end : start - speed;
        progress = parseInt(start - (speed * timeout) / 10);
        currentStyle = Math.max(progress, parseInt(targetStyle));
      }
      // console.log(`${currentStyle}--${end}`);
      this.cateRightList.current.scrollTop = currentStyle;
      if (currentStyle == end) {
        window.cancelAnimationFrame(animate);
      } else {
        this.setState({
          cateListScrollY: currentStyle
        });
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  };

  itemChangeLi = i => {
    const indexIntarl = Math.abs(i - this.state.index);
    const endScrollY = this.tops[i];
    let direction = "";
    // this.setState({
    //   index: i
    // });
    this.setState((prevState, props) => {
      let direction = prevState.index < i ? "down" : "up";
      this.scrollAnti(endScrollY, indexIntarl, direction);
      return {
        index: i
      };
    });

    // this.setState({
    //   cateListScrollY: this.tops[i]
    // });
  };
  cateListRight() {
    const data = this.props.data;
    return (
      <div className="cate-list-right" ref={this.cateRightList}>
        <ul ref={this.cateRightUl}>
          {data.map((item, index) => {
            return (
              <li
                key={index}
                data-cateid={item.cat_id}
                data-catename={item.cat_name}
              >
                <div className="lv2-top">
                  <span>{item.cat_name}</span>
                  <span>
                    查看更多 <i className="icon icon-ic_back" />
                  </span>
                </div>

                <CateLogo logo={item.cat_logo} />
                <ul className="lv2-ul">
                  {item.lv2.map((val, ind) => (
                    <li
                      key={ind}
                      data-secid={val.cat_id}
                      data-secname={val.cat_name}
                    >
                      <div className="lv2-li-img">
                        <img
                          data-originsrc={handleImgUrl(val.cat_logo)}
                          src={handleImgUrl(val.cat_logo)}
                        />
                      </div>
                      <p>{val.cat_name}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  cateListLeft() {
    const data = this.props.data;
    return (
      <div className="cate-list-left">
        <ul>
          {data.map((item, index) => {
            return (
              <li
                key={index}
                data-cateid={item.cat_id}
                data-catename={item.cat_name}
                onClick={() => this.itemChangeLi(index)}
                className={cs({ active: this.state.index == index })}
              >
                {item.cat_name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  render() {
    return (
      <AniTransition>
        <div
          className="cate-list-wrap"
          style={{ height: this.state.cateListHeight }}
        >
          <div className="cate-list-content">
            {this.cateListLeft()}
            {this.cateListRight()}
          </div>
        </div>
      </AniTransition>
    );
  }
}

export default List;
