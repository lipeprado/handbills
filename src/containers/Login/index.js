import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { H1 } from "@blueprintjs/core";

// Actions
import { login } from "../../actions/auth";

// Utils
import { validateEmail } from "../../helpers";

// Components
import Form from "./Form";

// Styles
import styles from "./styles.module.scss";

class Login extends Component {
  state = {
    email: null,
    password: null,
    errors: {
      email: false,
      password: false
    }
  };

  _handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  _handleBlur = event => {
    const { email, password } = this.state;
    const { name } = event.target;
    switch (name) {
      case "email":
        this._handleValidateEmail(email);
        break;
      case "password":
        this._generalValidate(password, name);
        break;
      default:
        break;
    }
  };

  _handleValidateEmail = email => {
    const { errors } = this.state;
    if (!validateEmail(email)) {
      this.setState({
        errors: {
          ...errors,
          email: true
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          email: false
        }
      });
    }
  };

  _generalValidate = (value, name) => {
    const { errors } = this.state;
    if (!value) {
      this.setState({
        errors: {
          ...errors,
          [name]: true
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          [name]: false
        }
      });
    }
  };

  _handleSubmit = async () => {
    const { email, password } = this.state;
    const { login, history } = this.props;

    if (email && password) {
      login(email, password);
      history.push("/");
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div className={styles.signup}>
        <H1 className={styles.signupText}>Login now.</H1>
        <Form
          errors={errors}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  null,
  { login }
)(withRouter(Login));
