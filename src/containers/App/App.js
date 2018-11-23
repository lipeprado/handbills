import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Portal } from "react-portal";
// Actions
import { logout } from "../../actions/auth";
import { modalChange } from "../../actions/ui";
// Routes
import Routes from "../../routes/";

// Components
import Navbar from "../../components/NavBar";
import CreateBill from "../Bills/Create";

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
  _onModalchange = () => {
    const { modalChange } = this.props;
    modalChange();
  };
  _onLogout = async () => {
    const { logout, history } = this.props;
    logout();
    history.push("/login");
  };
  render() {
    const { location, currentUser, modalOpen } = this.props;
    const isSignup = location.pathname === "/signup";
    const isLogin = location.pathname === "/login";
    return (
      <div className={styles.wrapper}>
        {modalOpen && (
          <Portal node={document && document.getElementById("modal")}>
            <CreateBill handleModal={this._onModalchange} />
          </Portal>
        )}
        {!isSignup &&
          !isLogin && (
            <Navbar
              onLogout={this._onLogout}
              handleModal={this._onModalchange}
              currentUser={currentUser}
            />
          )}
        <div className={styles.container}>
          <Routes />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    modalOpen: state.ui.modalOpen
  };
};

export default connect(
  mapStateToProps,
  { logout, modalChange }
)(withRouter(App));
