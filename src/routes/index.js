import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";

// Private
import PrivateRoute from "./Private";
import GuestRoute from "./Guest";

// Components
import Signup from "../containers/Signup";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";

class Routes extends Component {
  render() {
    const { location } = this.props;
    return (
      <Switch>
        <GuestRoute location={location} path="/signup" component={Signup} />
        <GuestRoute location={location} path="/login" component={Login} />
        <PrivateRoute location={location} path="/" component={Dashboard} />
        <Route component={() => <h1>404</h1>} />
      </Switch>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired
};

export default withRouter(Routes);
