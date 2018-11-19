import * as types from "./types";
import { HANDBILLS_API } from "../../utils";
import { AppToaster } from "../../components/Toastr";
export const signupRequest = () => ({ type: types.SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: types.SIGNUP_SUCCESS });
export const signupFailed = error => ({ type: types.SIGNUP_FAILED, error });

export const signup = user => {
  return async dispatch => {
    try {
      dispatch(signupRequest());
      const response = await HANDBILLS_API.post("/users/register", user);
      dispatch(signupSuccess());
      AppToaster.show({
        message: "User Created with Success.",
        intent: "success",
        icon: "thumbs-up"
      });
      return response;
    } catch (error) {
      signupFailed(error);
    }
  };
};
