import React from "react";
import ActionButton from "../components/ActionButton";
import InitiativeCard from "../components/InitiativeCard";
import "./styles/Homepage.css";
import EN from "../theme/language/en.json";
import { useHistory } from "react-router-dom";
import UrlPath from "../configs/UrlPath";

const Homepage = () => {
  const history = useHistory();

  const renderInitiativeCards = (items) => {
    return items.map((item) => (
      <InitiativeCard src={item.img} text={item.text} />
    ));
  };

  // Mock response to render images and texts
  const initiativeItems = [
    {
      img: `survey.jpg`,
      text: "Community survey",
    },
    {
      img: `redesign.jpg`,
      text: "Bus Stop Redesign",
    },
    {
      img: `facilities.jpg`,
      text: "Facilities upgraded",
    },
    {
      img: `renovation.jpg`,
      text: "On-going renovation",
    },
  ];

  return (
    <div className="body">
      <div className="homepageBanner">
        <div className="homepageBannerLayer">
          <div className="homepageBannerContent">
            <h1>{EN.makeDifference}</h1>
            <ActionButton
              onClick={() => {
                history.push(UrlPath.ourstation);
              }}
              buttonName={EN.supportAction}
            />
          </div>
        </div>
      </div>
      <div className="homepageInitiativeContent">
        <div>
          <h2>{EN.currentInitiative}</h2>
        </div>
        <div className="homepageSubInitiativeContent">
          {renderInitiativeCards(initiativeItems)}
        </div>
      </div>
      <div className="homepageAction">
        <div className="homepageActionContent">{EN.briefProjectInfo}</div>
        <div className="homepageActionContent">
          <ActionButton
            onClick={() => {
              // const value = localStorage.removeItem("staticAllStops");
              localStorage.clear();
              alert(`Local storage is now cleared`);
            }}
            // buttonName={EN.supportAction}
            buttonName="CLEAR LOCAL STORAGE"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
