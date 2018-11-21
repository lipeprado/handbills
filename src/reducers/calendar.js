import initialState from "./initialState";
import * as types from "../actions/calendar/types";

export default function(state = initialState.calendar, action) {
  switch (action.type) {
    case types.SET_CALENDAR:
      return {
        ...state,
        ...action.calendar
      };
    case types.SET_MONTH:
      return {
        ...state,
        month: action.month
      };
    default:
      return state;
  }
}
