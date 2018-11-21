import * as types from "./types";

export const setCalendar = calendar => ({
  type: types.SET_CALENDAR,
  calendar
});

export const setMonth = month => ({
  type: types.SET_MONTH,
  month
});
