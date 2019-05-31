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
    this.cateRightUl.current.addEventListener("scroll", this.scrollEvent);
  }
  scrollEvent = () => {
    console.log(111);
  };
  getScrollTops = () => {
    this.tops = [];
    toArray(this.cateRightUl.current.children).map(item =>
      this.tops.push(item.offsetTop)
    );
  };
  scrollAnti = (end, i) => {
    window.cancelAnimationFrame(animate);
    let startTime = null;
    const animate = timestamp => {
      const start = this.state.cateListScrollY;
      let speed = 55 * i;
      console.log(`start${start}`);
      if (end - start < speed) {
        speed = end - start;
      }
      const targetStyle = start >= end ? end : start + speed;
      if (!startTime) startTime = timestamp;
      const timeout = timestamp - startTime;
      const progress = parseInt((speed * timeout) / 10 + start);
      const currentStyle = Math.min(progress, parseInt(targetStyle));
      console.log(`${currentStyle}--${end}`);
      this.cateRightList.current.scrollTop = currentStyle;
      if (currentStyle < end) {
        this.setState({
          cateListScrollY: currentStyle
        });
        window.requestAnimationFrame(animate);
      } else {
        window.cancelAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  };
  itemChangeLi = i => {
    const indexIntarl = Math.abs(i - this.state.index);
    this.setState({
      index: i
    });
    const endScrollY = this.tops[i];
    this.scrollAnti(endScrollY, indexIntarl);
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
