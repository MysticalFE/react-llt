import React, { Component, Fragment } from "react";
import Fetch from "services/fetch";
import Loading from "components/Loading";
import OneNav from "layouts/OneCateNav";
import Swiper from "./Swiper";
// import Footer from 'layouts/Footer'

class Home extends Component {
  constructor(props) {
    console.log(props);
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
      "/api?format=json&v=v1&tmpl=index&method=theme.modules"
    );
    this.data = res.modules;
    console.log(this.data);
    this.setState({
      isLoading: true
    });
    // console.log(this.state.listData);
  };

  render() {
    const loading = <Loading type="line-bounce" />;
    return (
      <div className="content-wrap">
        {!this.state.isLoading ? (
          loading
        ) : (
          <Fragment>
            <OneNav
              data={this.data}
              widget="one_nav"
              location={this.props.location}
            />
            <Swiper data={this.data} widget="slider" />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Home;
