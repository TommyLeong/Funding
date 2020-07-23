import React from "react";
import "./styles/InitiativeCard.css";

const InitiativeCard = (props) => {
  return (
    <div className="initiativeCardContainer">
      <img
        src={require(`../theme/media/${props.src}`)}
        style={{ width: 330, height: 330 }}
        alt="img"
      />
      <div className="initiativeCardText">{props.text}</div>
    </div>
  );
};

export default InitiativeCard;
