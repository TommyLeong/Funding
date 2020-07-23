import React from "react";
import Backdrop from "../components/Backdrop";
import SideDrawer from "../components/SideDrawer";

import UrlPath from "../configs/UrlPath";
import logo from "../theme/media/logo.png";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import EN from "../theme/language/en.json";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
    };
  }

  backdropClickhandler = () => {
    this.setState({
      sideDrawerOpen: false,
    });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  renderSideDrawer = () => {
    if (this.state.sideDrawerOpen) {
      return (
        <div>
          <SideDrawer
            show={this.state.sideDrawerOpen}
            backdropClickHandler={this.backdropClickhandler}
          />
          <Backdrop backdropClickHandler={this.backdropClickhandler} />
        </div>
      );
    }
  };

  hideOnMouseOut = (event) => {
    this.setState({
      menuCSS: "menu",
    });
  };

  render() {
    return (
      <div className="header headerContainer">
        <button
          className="sideDrawerToggleButton"
          onClick={this.drawerToggleClickHandler}
        >
          <div className="sideDrawerToggleButton_line" />
          <div className="sideDrawerToggleButton_line" />
          <div className="sideDrawerToggleButton_line" />
        </button>
        {this.renderSideDrawer()}
        <div className="headerLogoSpace">
          <Link to={UrlPath.homepage}>
            <img src={logo} className="logoSize" alt="websiteLogo" />
          </Link>
        </div>
        <div className="headerCcontainerRow">
          <div className="headerMenu">
            <ul>
              <li>
                <a href={UrlPath.ourcampaign}>{EN.ourCampaign}</a>
              </li>
              <li>
                <a href={UrlPath.ourstation}>{EN.ourStations}</a>
              </li>
              <li>
                <a href={UrlPath.faq}>{EN.FAQ}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
