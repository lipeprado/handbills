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
    case types.CREATE_BILLS_REQUEST:
      return {
        ...state,
        isCreating: true
      };

    case types.CREATE_BILL_SUCCESS:
      return {
        ...state,
        isCreating: false,
        bills: [action.bill, ...state.bills]
      };
    case types.CREATE_BILL_FAILED:
      return {
        ...state,
        isCreating: false
      };
    default:
      return state;
  }
}
