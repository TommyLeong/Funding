import {
  GET_ALL_STOPS,
  GET_ALL_STOPS_SUCCESS,
  GET_ALL_STOPS_FAIL,
} from "../types";
import * as ApiManager from "../../helpers/apiConnector";
import Static_GetAllStops from "../../Static_GetAllStops.json";

const getAllStops = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_STOPS });

    let response = await ApiManager.getAPI("http://localhost:1337/getallstops");

    // ----Begin overriding response: Remove the following code if you do not wish to override the response----
    // Here to verify whether localStorage exist before assign static JSON to response
    const staticAllStops = localStorage.getItem("staticAllStops");
    if (!staticAllStops) {
      response = Static_GetAllStops;
      localStorage.setItem("staticAllStops", JSON.stringify(response));
    } else {
      response = JSON.parse(staticAllStops);
    }
    // ----Finish overriding response----

    if (response.status === 200) {
      dispatch({
        type: GET_ALL_STOPS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: GET_ALL_STOPS_FAIL,
        payload: response,
      });
    }
  };
};

export { getAllStops };
