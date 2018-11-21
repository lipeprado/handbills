import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!isAuth ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(GuestRoute);
