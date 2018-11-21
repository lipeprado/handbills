import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import { onValidAuth } from "./actions/auth";
import { setCalendar } from "./actions/calendar";
import { setAuthToken } from "./utils";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";
import moment from "moment";
import "moment/locale/pt-br";
// GLOBAL STYLES
import "./static/_global.scss";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// Store
const store = configureStore();

moment.locale("pt-BR");
moment().format("LLLL");

bootstrap();

function bootstrap() {
  const months = moment.months();
  const days = moment.weekdays(true);
  const month = moment().format("MMMM");
  const today = moment().format("dddd");
  const calendar = {
    months,
    days,
    month,
    today
  };
  if (localStorage["token"]) {
    let user = localStorage.getItem("token");
    let decodeUser = jwtDecode(user);
    // verify if token is valid and search for user in database
    setAuthToken(localStorage["token"], "Bearer");
    store.dispatch(onValidAuth(decodeUser));
    store.dispatch(setCalendar(calendar));
  }
}
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
