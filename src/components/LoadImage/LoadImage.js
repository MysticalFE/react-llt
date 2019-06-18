/*
 * @Description:
 * @Author: Jack.jia
 * @Date: 2019-06-06 14:20:45
 * @LastEditors: Jack.jia
 * @LastEditTime: 2019-06-18 15:35:15
 */
import React, { Component, Fragment, cloneElement } from "react";
import "./LoadImage.scss";

class RectLoadImage extends Component {
  componentDidMount() {}
  render() {
    return <div>正常的</div>;
  }
}

/**
 *
 *
 * @class IntersectionObserverImage
 * @extends {Component}
 */
class IntersectionObserverImage extends Component {
  constructor(props) {
    super(props);
    this.io = null;
  }
  componentDidMount() {
    this.setObserve();
  }
  componentWillUnmount() {
    this.io.disconnect();
    this.io = null;
  }
  setObserve() {
    const { children } = this.props.children;
    const images = document.querySelectorAll("[data-originsrc]");
    // console.log(images);
    if (!("IntersectionObserver" in window)) {
      throw "当前浏览器不支持IntersectionObserver api";
    }
    const options = {
      root: null, //当前触发的根dom, 不设置默认为顶级文档的视窗  document
      // threshold: [0, 0.5, 1], //交叉比例，设置后将决定到哪个比例后触发回调
      rootMargin: "0px 0px 100px 0px" //如果设置为正值，可以实现提前100px加载图片
    };
    this.io = new IntersectionObserver(this.callback, options);
    Array.from(images).forEach(item => {
      this.io.observe(item);
    });
  }
  callback = entries => {
    // console.log(entries);
    // console.log(this.io.thresholds);
    entries.forEach(item => {
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.originsrc;
        this.io.unobserve(item.target);
      }
    });
  };
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
export { RectLoadImage, IntersectionObserverImage };
