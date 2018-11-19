import { combineReducers } from "redux";
import signup from "./signup";
import auth from "./auth";

const appReducer = combineReducers({
  signup,
  auth
});

export default appReducer;
