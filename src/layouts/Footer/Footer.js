import React, { Component, Suspense, lazy } from "react";
import { Link, withRouter } from "react-router-dom";
import cs from "classnames";
import "./Footer.scss";

const tarbar = [
  {
    icon: "icon-tab_shouye",
    "active-icon": "icon-tab_shouye_sele",
    text: "首页",
    router: "/home"
  },
  {
    icon: "icon-tab_tuijian",
    "active-icon": "icon-tab_tuijian_sele",
    text: "推荐",
    router: "/recommend"
  },
  {
    icon: "icon-tab_sousuo",
    "active-icon": "icon-tab_sousuo_sele",
    text: "搜索",
    router: "/category"
  },
  {
    icon: "icon-tab_gouwuche",
    "active-icon": "icon-tab_gouwuche_sele",
    text: "购物车",
    router: "/cart"
  },
  {
    icon: "icon-tab_wode",
    "active-icon": "icon-tab_wode-sele",
    text: "个人中心",
    router: "/myCenter"
  }
];

// const Home = lazy(() => import('pages/Home/Home'))

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  itemChange = i => {
    this.setState({
      index: i
    });
  };
  render() {
    return (
      <div className="bottom-nav">
        <ul>
          {tarbar.map((item, i) => {
            const matchPath =
              this.props.location.pathname == "/"
                ? "/home"
                : this.props.location.pathname;
            const exactPath = matchPath == item.router;
            return (
              <li key={i} onClick={() => this.itemChange(i)}>
                <Link to={item.router} className={cs({ active: exactPath })}>
                  <i
                    className={cs("icon", item.icon, {
                      [`${item["active-icon"]}`]: exactPath
                    })}
                  />
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Footer);
