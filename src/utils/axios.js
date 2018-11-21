import axios from "axios";
import { BASEURL } from "./constants";

export const setAxiosDefaults = () => {
  axios.defaults.headers.common["Content-Type"] =
    "application/json; charset=utf-8";
};

export const setAuthToken = (token, type) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${type} ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const clearAxiosDefaults = () => {
  axios.defaults.headers.common["Content-Type"] = "";
  axios.defaults.baseURL = "";
};

export const HANDBILLS_API = axios.create({
  baseURL: BASEURL,
  crossDomain: true
});
