import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

// Actions
import { logout } from "../../actions/auth";
// Routes
import Routes from "../../routes/";

// Components
import Navbar from "../../components/NavBar";

// Styles
import styles from "./styles.module.scss";

class App extends Component {
  componentWillMount() {
    const { logout, history } = this.props;
    let token = localStorage.getItem("token");
    if (token) {
      let decodeUser = token && jwtDecode(token);
      const tokenExpired = moment.unix(decodeUser.exp).isBefore();
      if (tokenExpired) {
        logout();
        history.push("/login");
      }
    }
  }

  _onLogout = async () => {
    const { logout, history } = this.props;
    logout();
    history.push("/login");
  };
  render() {
    const { location, currentUser } = this.props;
    const isSignup = location.pathname === "/signup";
    const isLogin = location.pathname === "/login";
    return (
      <div className={styles.wrapper}>
        {!isSignup &&
          !isLogin && (
            <Navbar onLogout={this._onLogout} currentUser={currentUser} />
          )}
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(App));
