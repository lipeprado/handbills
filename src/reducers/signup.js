import initialState from "./initialState";
import * as types from "../actions/signup/types";

export default function(state = initialState.signup, action) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isCreating: true
      };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isCreating: false
      };
    case types.SIGNUP_FAILED:
      return {
        ...state,
        isCreating: false,
        createdUser: {}
      };

    default:
      return state;
  }
}
