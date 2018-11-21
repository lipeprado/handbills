import initialState from "./initialState";
import * as types from "../actions/calendar/types";

export default function(state = initialState.calendar, action) {
  switch (action.type) {
    case types.SET_CALENDAR:
      return {
        ...state,
        ...action.calendar
      };

    default:
      return state;
  }
}
