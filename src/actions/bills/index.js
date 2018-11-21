import * as types from "./types";
import { HANDBILLS_API } from "../../utils";
import moment from "moment";

const defaultYear = moment().format("Y");

export const fetchBillsRequest = () => ({ type: types.FETCH_BILLS_REQUEST });
export const fetchBillsSuccess = bills => ({
  type: types.FETCH_BILLS_SUCCESS,
  bills
});
export const fetchBillsFailed = error => ({
  type: types.FETCH_BILLS_FAILED,
  error
});

export const fetchBills = (month, year = defaultYear) => {
  return async dispatch => {
    try {
      dispatch(fetchBillsRequest());
      const res = await HANDBILLS_API.get("/bills", {
        params: {
          month: moment()
            .month(month)
            .format("M"),
          year: year
        }
      });
      dispatch(fetchBillsSuccess(res.data.bills));
      return res.data.bills;
    } catch (error) {
      fetchBillsFailed(error);
    }
  };
};
