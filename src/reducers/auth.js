import initialState from "./initialState";
import * as types from "../actions/auth/types";

export default function(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuth: false
      };

    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: Object.keys(action.user).length !== 0,
        currentUser: action.user
      };
    case types.AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuth: false
      };
    case types.NO_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        currentUser: {}
      };
    default:
      return state;
  }
}
