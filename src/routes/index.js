import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";

// Private
import PrivateRoute from "./Private";
import GuestRoute from "./Guest";

// Components
import Signup from "../containers/Signup/Signup";

class Routes extends Component {
  render() {
    const { location } = this.props;
    return (
      <Switch>
        <PrivateRoute
          exact
          path="/protected"
          component={() => <h1>DashBoard</h1>}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={() => <h1>Login</h1>} />
        <GuestRoute location={location} path="/signup" component={Signup} />
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
