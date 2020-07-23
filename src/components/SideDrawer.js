import React from "react";
import "./styles/SideDrawer.css";
import CloseIcon from "@material-ui/icons/Close";
import UrlPath from "../configs/UrlPath";
import EN from "../theme/language/en.json";

const SideDrawer = (props) => {
  let classGroup = "sideDrawer";

  if (props.show) {
    classGroup = "sideDrawer open";
  }

  return (
    <div>
      <nav className={classGroup}>
        <div className="sideDrawer_title">
          {EN.campaignTitle}
          <div className="spacer" />
          <CloseIcon
            onClick={() => {
              props.backdropClickHandler();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul>
          <li>
            <a
              href={UrlPath.ourcampaign}
              onClick={() => {
                props.backdropClickHandler();
              }}
            >
              {EN.ourCampaign}
            </a>
          </li>
          <li>
            <a
              href={UrlPath.ourstation}
              onClick={() => {
                props.backdropClickHandler();
              }}
            >
              {EN.ourStations}
            </a>
          </li>
          <li>
            <a
              href={UrlPath.faq}
              onClick={() => {
                props.backdropClickHandler();
              }}
            >
              {EN.FAQ}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideDrawer;
