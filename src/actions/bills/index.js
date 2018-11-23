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
      setTimeout(() => {
        dispatch(fetchBillsSuccess(res.data.bills));
      }, 1000);
      return res.data.bills;
    } catch (error) {
      fetchBillsFailed(error);
    }
  };
};

export const createBillRequest = () => ({ type: types.CREATE_BILLS_REQUEST });

export const createBillSuccess = bill => ({
  type: types.CREATE_BILL_SUCCESS,
  bill
});
export const createBillFailed = error => ({
  type: types.CREATE_BILL_FAILED,
  error
});

export const createBill = bill => {
  return async dispatch => {
    try {
      dispatch(createBillRequest());
      const res = await HANDBILLS_API.post("/bills", bill);
      dispatch(createBillSuccess(res.data.bill));
      return res.data.bill;
    } catch (error) {
      createBillFailed(error);
    }
  };
};
