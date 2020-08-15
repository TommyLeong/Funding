import {
  GET_ALL_STOPS,
  GET_ALL_STOPS_SUCCESS,
  GET_ALL_STOPS_FAIL,
} from "../types";
import * as ApiManager from "../../helpers/apiConnector";

const getAllStops = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_STOPS });

    let response = await ApiManager.getAPI("http://localhost:1337/getallstops");

    if (response === null) {
      dispatch({ type: GET_ALL_STOPS_FAIL, payload: response });
      return;
    } else if (response.status === 200) {
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
