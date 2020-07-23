import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import urlPath from "./configs/UrlPath";
import Error404 from "./containers/Error404";
import Homepage from "./containers/Homepage";
import OurCampaign from "./containers/OurCampaign";
import OurStation from "./containers/OurStation";
import Donation from "./containers/Donation";
import Payment from "./containers/Payment";
import Acknowledgement from "./containers/Acknowledgement";
import InternalError from "./containers/InternalError";
import FAQ from "./containers/FAQ";

function App() {
  return (
    <Router>
      <Header />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path={urlPath.homepage} component={Homepage} />
        <Route exact path={urlPath.ourcampaign} component={OurCampaign} />
        <Route exact path={urlPath.ourstation} component={OurStation} />
        <Route exact path={urlPath.donation} component={Donation} />
        <Route exact path={urlPath.payment} component={Payment} />
        <Route
          exact
          path={urlPath.acknowledgement}
          component={Acknowledgement}
        />
        <Route exact path={urlPath.internalError} component={InternalError} />
        <Route exact path={urlPath.faq} component={FAQ} />
        <Route component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
