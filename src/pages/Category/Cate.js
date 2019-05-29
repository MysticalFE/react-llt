import React, { Component, createRef } from "react";
import Fetch from "services/fetch";
import cs from "classnames";
import "./Cate.scss";
import CateList from "layouts/Category/CateList";
import Loading from "components/Loading";

class Catetory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.getData();
    }, 800);
  }
  getData = async () => {
    const res = await Fetch(
      "/api?format=json&v=v1&method=category.itemCategory"
    );
    this.listData = res.categorys;
    this.setState({
      isLoading: true
    });
    // console.log(this.state.listData);
  };
  templ = () => {
    return (
      <div className="cate-header">
        <div className="cate-title">搜索</div>
        <div className="cate-input-wrap">
          <div className="cate-input-cantent">
            <span className="icon icon-ic_sousuo" />
            <span>点击进行搜索</span>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const loading = <Loading type="line-bounce" />;
    return (
      <div className="cate-wrap">
        {this.templ()}
        {!this.state.isLoading ? loading : <CateList data={this.listData} />}
      </div>
    );
  }
}

export default Catetory;
