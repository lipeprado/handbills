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
    case types.DELETE_BILLS_REQUEST:
      return {
        ...state
      };

    case types.DELETE_BILL_SUCCESS:
      const filtred = state.bills.filter(bill => action.id !== bill.id);
      debugger;
      return {
        ...state,
        bills: filtred
      };
    case types.DELETE_BILL_FAILED:
      return {
        ...state
      };
    case types.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        bills: state.bills.map(bill => {
          if (bill.id === action.bill.id) {
            return {
              ...bill,
              status: !bill.status
            };
          } else {
            return bill;
          }
        })
      };
    default:
      return state;
  }
}
