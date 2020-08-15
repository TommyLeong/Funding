import React, { useEffect, useRef } from "react";
import "./styles/Payment.css";
import { useLocation, useHistory } from "react-router-dom";
import Lottie from "lottie-web";
import animationData from "../theme/media/transfer.json";
import * as ApiManager from "../helpers/apiConnector";
import UrlPath from "../configs/UrlPath";
import { v4 as uuidv4 } from "uuid";

const Payment = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { donationAmount, station, donatorName, email } = location.state;

  let animBox = useRef(null);
  const ackId = uuidv4();

    }

  useEffect(() => {
    Lottie.loadAnimation({
      container: animBox,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    async function postData() {
      const data = {
        station,
        donatorName,
        donationAmount,
        email,
      };

      let response = await ApiManager.postAPI(
        "http://localhost:1337/add-donations",
        data
      );


      if (response.status === 200) {
        // Set timeout to simulate waiting response
        setTimeout(() => {
          history.push({
            pathname: UrlPath.acknowledgement,
            // .replace(":stationName", busStation)
            // .replace(":ackUniqueId", ackId)
            state: {
              station,
              donatorName,
              donationAmount,
              email,
              ackUniqueId: ackId,
            },
          });
        }, 3000);
      }
    }
    postData();
  }, []);

  const renderLoading = () => {
    return (
      <div
        style={{
          width: 400,
          margin: "0 auto",
        }}
        ref={(el) => (animBox = el)}
      />
    );
  };

  return (
    <div className="body">
      <div className="paymentContainer">
        <h2>Please do not leave or refresh the page</h2>
      </div>
      <div>{renderLoading()}</div>
    </div>
  );
};

export default Payment;
