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
      index: 0
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
    this.cateList.current.style.height = `${listHeight}px`;
    this.getScrollTops();
    this.cateRightList.current.addEventListener("scroll", this.scrollEvent);
  }
  scrollEvent = () => {};
  getScrollTops = () => {
    this.tops = [];
    toArray(this.cateRightUl.current.children).map(item =>
      this.tops.push(item.offsetTop)
    );
  };
  itemChangeLi = i => {
    this.setState({
      index: i
    });
    // if (this.state.index == 0) this.cateRightList.current.scrollTop = 0;
    console.log();
    console.log(this.state.index);
    console.log(this.tops[this.state.index - 1]);
    this.cateRightList.current.scrollTop = this.tops[this.state.index - 1];
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
        <div className="cate-list-wrap" ref={this.cateList}>
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
