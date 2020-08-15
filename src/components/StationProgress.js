import React from "react";
import "./styles/StationProgress.css";

const StationProgress = (props) => {
  let exceedORremain = "Remaining";

  let remainingAmount = 700 - props.collectedAmount;
  if (remainingAmount < 0) {
    remainingAmount = props.collectedAmount - 700;
    exceedORremain = "Extra collected";
  }

  const renderStatus = () => {
    if (props.collectedAmount >= 700) {
      return (
        <img
          src={require(`../theme/media/completed.png`)}
          style={{ width: 30, height: 30 }}
          alt="img"
        />
      );
    }
  };

  return (
    <div
      className="stationProgressContainer"
      style={
        props.selected
          ? { backgroundColor: "#162530", cursor: "default", color: "white" }
          : {}
      }
      onClick={() => {
        props.callbackAction(
          props.stationName,
          props.collectedAmount,
          props.id
        );
      }}
    >
      <div className="stationProgressTitleIcon">
        {props.stationName} Bus Station
        {renderStatus()}
      </div>
      <div className="">Target Amount: 700</div>
      <div className="stationProgressContainerDetails">
        <div className="">
          {exceedORremain}: {remainingAmount}
        </div>
        <div className="">Collected: {props.collectedAmount}</div>
      </div>
    </div>
  );
};

export default StationProgress;
