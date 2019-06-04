import React, { Component } from "react";
import cs from "classnames";
import "./OneCateNav.scss";

const FIRST_NAV = {
  cat_id: "",
  categoryname: "热门"
};
class OneNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecedIndex: 0
    };
  }
  componentWillMount() {
    this.dealData();
  }
  dealData = () => {
    const { data, widget } = this.props;
    this.data = data.filter(item => item.widget == widget);
    this.data[0].params.pic.unshift(FIRST_NAV);
  };
  selectedLi = i => {
    this.setState({
      selecedIndex: i
    });
  };
  render() {
    const navData = this.data[0].params.pic;
    return (
      <div className="nav-content">
        <ul>
          {navData.map((item, index) => (
            <li
              data-id={item.cat_id}
              key={index}
              onClick={() => this.selectedLi(index)}
            >
              <span
                className={cs({
                  "nav-selected": this.state.selecedIndex == index
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
