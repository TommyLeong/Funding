import React, { Component } from "react";
import "./styles/InternalError.css";
import Lottie from "lottie-web";
import animationData from "../theme/media/internalError.json";

class InternalError extends Component {
  componentDidMount() {
    Lottie.loadAnimation({
      container: this.animBox,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }
  render() {
    return (
      <div className="body">
        <div className="internalErrorContainer">
          <h2>Something went wrong</h2>
          <div>
            We keep track of these errors, but feel free to contact us if
            refreshing doesn't fix things.
          </div>
        </div>
        <div
          style={{ width: 400, margin: "0 auto" }}
          ref={(ref) => (this.animBox = ref)}
        />
      </div>
    );
  }
}

export default InternalError;
