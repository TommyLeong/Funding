import {
  GET_ALL_STOPS,
  GET_ALL_STOPS_SUCCESS,
  GET_ALL_STOPS_FAIL,
} from "../types";

const INITIAL_STATE = {
  // Get all stops
  allStops: null,
};

export default (state, action) => {
  let currentState = state;
  if (state == null) {
    currentState = INITIAL_STATE;
  }

  switch (action.type) {
    case GET_ALL_STOPS:
      return {
        ...currentState,
        allStops: null,
      };

    case GET_ALL_STOPS_SUCCESS:
      return {
        ...currentState,
        allStops: action.payload,
      };

    case GET_ALL_STOPS_FAIL:
      return {
        ...currentState,
        allStops: action.payload,
      };

    default:
      return currentState;
  }
};
