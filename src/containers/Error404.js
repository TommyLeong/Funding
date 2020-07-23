import React, { Component } from "react";
import Lottie from "lottie-web";
import animationData from "../theme/media/404animation.json";
import UrlPath from "../configs/UrlPath";

class Error404 extends Component {
  componentDidMount() {
    Lottie.loadAnimation({
      container: this.animBox, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData, // the path to the animation json
    });
  }
  render() {
    return (
      <div className="body">
        <h2 style={{ textAlign: "center" }}>
          You seem lost. Need GPS to back {""}
          <a
            href={UrlPath.homepage}
            style={{ textDecoration: "none", color: "red" }}
          >
            Home
          </a>
          ?
        </h2>
        <div
          style={{ width: 400, margin: "0 auto" }}
          ref={(ref) => (this.animBox = ref)}
        />
      </div>
    );
  }
}

export default Error404;
