import React, { Component } from "react";
import Carousel from "components/Carousel";
import "./Swiper.scss";

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.data = [];
  }
  componentWillMount() {
    this.dealData();
  }
  componentDidMount() {}
  dealData() {
    const { data, widget } = this.props;
    this.data = data.filter(item => item.widget == widget);
    console.log(this.data);
  }

  render() {
    return (
      <Carousel>
        {this.data[0].params.pic.map((item, index) => (
          <div key={index}>
            <img src={item.imagesrc} />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default Swiper;
