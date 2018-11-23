import { combineReducers } from "redux";
import auth from "./auth";
import signup from "./signup";
import ui from "./ui";
import calendar from "./calendar";
import bills from "./bills";

const appReducer = combineReducers({
  auth,
  signup,
  calendar,
  bills,
  ui
});

export default appReducer;
