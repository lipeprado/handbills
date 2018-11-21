import initialState from "./initialState";
import * as types from "../actions/bills/types";

export default function(state = initialState.bills, action) {
  switch (action.type) {
    case types.FETCH_BILLS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.FETCH_BILLS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bills: [...action.bills]
      };
    case types.FETCH_BILLS_FAILED:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}
