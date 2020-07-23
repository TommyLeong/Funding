import React, { useEffect, useState } from "react";
import "./styles/OurStation.css";
import StationProgress from "../components/StationProgress";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import UrlPath from "../configs/UrlPath";
import * as ApiManager from "../helpers/apiConnector";
import queryString from "query-string";
import * as Formula from "../helpers/formula";
import Dropdown from "../components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { getAllStops } from "../redux/action";

const OurStation = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useState({
    apiResponse: [],
    bkupResponse: [],
    sortDropdownIndex: 0,
    filterCompleteDropdownIndex: 0,
    redirect: false,
  });
  let params = queryString.parse(location.search);

  const allStops = useSelector((state) => state.general.allStops);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Alternative of Redux Thunk , we may use call API directly on page with the commented code below
     */

    // async function fetchData() {
    //   let response = await ApiManager.getAPI(
    //     "http://localhost:1337/getallstops"
    //   );
    //   if (response.status === 200) {
    //     response = response.data;
    //     response = Formula.sortAscending(response, "collectedAmount");
    //     if (response !== null)
    //       setState({ ...state, apiResponse: response, bkupResponse: response });
    //   } else {
    //     setState({ ...state, redirect: true });
    //   }
    // }
    // fetchData();
    dispatch(getAllStops());
  }, []);

  useEffect(() => {
    let index = {
      target: {
        value: state.sortDropdownIndex,
      },
    };

    sortOnChange(index);
  }, [state.apiResponse]);

  useEffect(() => {
    if (allStops !== null) {
      if (allStops.status === 200) {
        const sortedData = Formula.sortAscending(
          allStops.data,
          "collectedAmount"
        );
        if (sortedData !== null) {
          setState({
            ...state,
            apiResponse: sortedData,
            bkupResponse: sortedData,
          });
        }
      } else {
        setState({ ...state, redirect: true });
      }
    }
  }, [allStops]);

  const navigateToDonation = (station, collectedAmount) => {
    history.push({
      pathname: UrlPath.donation.replace(":stationName", station),
      // search: `?station=${station}`,
      state: { collectedAmount, busStation: station },
    });
  };

  const renderStationDashboard = (stations) => {
    return stations.map((station, index) => (
      <StationProgress
        key={index}
        stationName={station.stationName}
        collectedAmount={station.collectedAmount}
        callbackAction={navigateToDonation}
        selected={false}
      />
    ));
  };

  const stationCompleted = (value) => {
    let filterList = [];
    value.map((item) => {
      let remainingAmount = 700 - item.collectedAmount;
      if (remainingAmount <= 0) {
        filterList.push(item);
      }
    });
    return filterList;
  };

  const stationIncomplete = (value) => {
    let filterList = [];
    value.map((item) => {
      if (item.collectedAmount < 700) {
        filterList.push(item);
      }
    });
    return filterList;
  };

  const filterCompleteOnChange = (event) => {
    let currentResponse = state.bkupResponse;
    let filteredApiResponse = [];
    let filterCompleteDropdownIndex = 0;

    switch (event.target.value) {
      case 0:
        filteredApiResponse = currentResponse;
        break;

      case 1:
        filteredApiResponse = stationCompleted(currentResponse);
        filterCompleteDropdownIndex = 1;
        break;

      case 2:
        filteredApiResponse = stationIncomplete(currentResponse);
        filterCompleteDropdownIndex = 2;
        break;

      default:
        filteredApiResponse = currentResponse;
        break;
    }

    setState({
      ...state,
      filterCompleteDropdownIndex,
      apiResponse: filteredApiResponse,
    });
  };

  const sortOnChange = (event) => {
    let sortedApiResponse = [];
    let sortDropdownIndex = 0;

    switch (event.target.value) {
      case 0:
        sortedApiResponse = Formula.sortAscending(
          state.apiResponse,
          "collectedAmount"
        );

        break;
      case 1:
        sortedApiResponse = Formula.sortDescending(
          state.apiResponse,
          "collectedAmount"
        );
        sortDropdownIndex = 1;
        // setState({ ...state, sortDropdownIndex: 1 });
        break;

      default:
        sortedApiResponse = Formula.sortAscending(
          state.apiResponse,
          "collectedAmount"
        );
        break;
    }

    setState({ ...state, sortDropdownIndex, apiResponse: sortedApiResponse });
  };

  const renderFilterSorting = () => {
    return (
      <div className="ourstationDashboard_SortFilterContainer">
        <div className="ourstationDashboard_Filter">
          Filter
          <div>
            <Dropdown
              selectedIndex={state.filterCompleteDropdownIndex}
              menuItem={["All status", "Completed status", "Incomplete status"]}
              onChange={filterCompleteOnChange}
            />
          </div>
        </div>
        <div className="ourstationDashboard_Sort">
          Sort By
          <div>
            <Dropdown
              selectedIndex={state.sortDropdownIndex}
              menuItem={[
                "Collected Amount Ascending",
                "Collected Amount Descending",
              ]}
              onChange={sortOnChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="body">
      {state.redirect ? <Redirect to={UrlPath.internalError} /> : <div />}
      <div className="ourstationDashboard">
        <h3>Campaign Status Dashboard</h3>
        <div style={{ width: "100%" }}>{renderFilterSorting()}</div>
        <div className="ourstationDashboardContent">
          {renderStationDashboard(state.apiResponse)}
        </div>
      </div>
    </div>
  );
};

export default OurStation;
