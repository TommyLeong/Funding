import React from "react";
import "./styles/Acknowledgement.css";
import { useLocation } from "react-router-dom";

const Acknowledgement = () => {
  const location = useLocation();

  const {
    station,
    donatorName,
    donationAmount,
    email,
    ackUniqueId,
  } = location.state;

  const floatDonationAmount = parseFloat(donationAmount).toFixed(2);

  return (
    <div className="body">
      <div className="acknowledgementContainer">
        <div className="ackContainerTitle">
          <h3>Acknowledgement</h3>
        </div>
        <div className="ackContainerMsg">
          <div>
            Thank you for again on your generous support to the community!{" "}
          </div>
          <div>
            Kindly please find your acknowledgement receipt here as we have
            received your donation to our project.
          </div>
        </div>

        <div className="ackContainerReceipt">
          <div className="ackContainerReceiptBody ackContainerReceiptKey">
            ACKNOWLEDGEMENT
          </div>
          <div className="ackContainerReceiptBody ackContainerReceiptTitle">
            <div>
              <img
                src={require(`../theme/media/completed.png`)}
                style={{
                  width: 30,
                  height: 30,
                }}
                alt="img"
              />
            </div>
            <div className="ackContainerReceiptKey">Successful</div>
            <div>Your payment has been received.</div>
          </div>

          <div className="ackContainerReceiptBody">
            <div className="ackContainerReceiptKey">Transaction ID:</div>
            <div className="ackContainerReceiptValue">{ackUniqueId}</div>
          </div>

          <div className="ackContainerReceiptBody">
            <div className="ackContainerReceiptKey">Station Donated:</div>
            <div className="ackContainerReceiptValue">{station}</div>
          </div>

          <div className="ackContainerReceiptBody">
            <div className="ackContainerReceiptKey">Donator Name:</div>
            <div className="ackContainerReceiptValue">{donatorName}</div>
          </div>

          <div className="ackContainerReceiptBody">
            <div className="ackContainerReceiptKey">Donation Amount:</div>
            <div className="ackContainerReceiptValue">
              {floatDonationAmount}
            </div>
          </div>

          <div className="ackContainerReceiptBody">
            <div className="ackContainerReceiptKey">Email:</div>
            <div className="ackContainerReceiptValue">
              {email ? email : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acknowledgement;
