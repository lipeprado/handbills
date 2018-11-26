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

export const deleteBillRequest = () => ({ type: types.DELETE_BILLS_REQUEST });

export const deleteBillSuccess = id => ({
  type: types.DELETE_BILL_SUCCESS,
  id
});
export const deleteBillFailed = error => ({
  type: types.DELETE_BILL_FAILED,
  error
});

export const deleteBill = id => {
  return async dispatch => {
    try {
      dispatch(deleteBillRequest());
      const res = await HANDBILLS_API.delete(`/bills/${id}`);
      dispatch(deleteBillSuccess(id));
      return res.data;
    } catch (error) {
      deleteBillFailed(error);
    }
  };
};

export const statusBillSuccess = bill => ({
  type: types.CHANGE_STATUS_SUCCESS,
  bill
});

export const statusBill = id => {
  return async dispatch => {
    try {
      const res = await HANDBILLS_API.patch(`/bills/${id}`);
      dispatch(statusBillSuccess(res.data.billsUpdated[0]));
      return res.data;
    } catch (error) {
      return { error };
    }
  };
};
