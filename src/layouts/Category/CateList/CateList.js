import React, { Component, createRef } from "react";
import cs from "classnames";
import AniTransition from "components/AnimationTransition";
import "./CateList.scss";
import { getEleRect, getViewportSize } from "utils/dom";

class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.cateList = createRef();
  }
  componentDidMount() {
    const listHeight =
      getViewportSize().height -
      getEleRect(".cate-header").height -
      getEleRect(".bottom-nav").height;
    this.cateList.current.style.height = `${listHeight}px`;
  }
  render() {
    const data = this.props.data;
    return (
      <AniTransition>
        <div className="cate-list-wrap" ref={this.cateList}>
          <div className="cate-list-content">
            <div className="cate-list-left">
              <ul>
                {data.map((item, index) => {
                  return (
                    <li
                      key={index}
                      data-cateid={item.cat_id}
                      data-catename={item.cat_name}
                    >
                      {item.cat_name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="cate-list-right">
              <ul>
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
                      <div className="ad-img">
                        <img
                          data-originsrc={item.cat_logo}
                          src="https://shop-image1.lianwifi.com/FnyTWcdoIdNjxRJC2GSwue9eDS9q?1557327269"
                        />
                      </div>
                      <ul className="lv2-ul">
                        {item.lv2.map((val, ind) => (
                          <li
                            key={ind}
                            data-secid={val.cat_id}
                            data-secname={val.cat_name}
                          >
                            <div className="lv2-li-img">
                              <img
                                data-originsrc={val.cat_logo}
                                src="https://shop-image2.lianwifi.com/FmthIyn-OONH7zK8vAF6gyzo326j?1557327269"
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
          </div>
        </div>
      </AniTransition>
    );
  }
}

export default List;
