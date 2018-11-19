import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Routes
import Routes from "../../routes/";

// Components
import Navbar from "../../components/NavBar";

// Styles
import styles from "./styles.module.scss";

class App extends Component {
  render() {
    const { location } = this.props;
    const isSignup = location.pathname === "/signup";
    const isLogin = location.pathname === "/login";
    return (
      <div className={styles.wrapper}>
        {!isSignup && !isLogin && <Navbar />}
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(App);
