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
  const {
    donationAmount,
    station,
    donatorName,
    email,
    id,
    collectedAmount,
  } = location.state;

  let animBox = useRef(null);
  const ackId = uuidv4();

  async function appendIntoDonationRecord() {
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
      updateStationDonationAmount();
    }
  }

  async function updateStationDonationAmount() {
    const data = {
      // To append "number" data type, you realize I have added "+" infront of variable
      // https://stackoverflow.com/a/14496556/4311268
      collectedAmount: +collectedAmount + +donationAmount,
    };

    let response = await ApiManager.putAPI(
      `http://localhost:1337/getallstops/${id}`,
      data
    );

    if (response.status === 200) {
      // Set timeout to simulate waiting response
      setTimeout(() => {
        history.push({
          pathname: UrlPath.acknowledgement,
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

  useEffect(() => {
    Lottie.loadAnimation({
      container: animBox,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    appendIntoDonationRecord();
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
