import jwtDecode from "jwt-decode";
import * as types from "./types";
import { setAuthToken, HANDBILLS_API } from "../../utils";

export const authRequest = () => ({ type: types.AUTH_REQUEST });

export const onValidAuth = user => ({ type: types.AUTH_SUCCESS, user });

export const authFailed = () => ({ type: types.AUTH_FAILED });

export const login = (email, password) => {
  return async dispatch => {
    try {
      dispatch(authRequest());
      const response = await HANDBILLS_API.post("/auth/login", {
        email,
        password
      });
      authUser(response, dispatch);
      return response.data.token;
    } catch (error) {
      dispatch(authFailed(error));
      throw new Error(error);
    }
  };
};

export const noToken = () => {
  return { type: types.NO_TOKEN };
};

export const logout = () => {
  return async dispatch => {
    dispatch(noToken());
    localStorage.removeItem("token");
    setAuthToken(false);
  };
};

const authUser = (res, dispatch) => {
  const { token, type } = res.data;
  localStorage.setItem("token", token);
  setAuthToken(token, type);
  dispatch(onValidAuth(jwtDecode(token)));
};
