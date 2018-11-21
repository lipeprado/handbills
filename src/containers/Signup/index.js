import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { H1 } from "@blueprintjs/core";

// Components
import Form from "./Form";

// Validation
import { validateEmail, validateUser } from "../../helpers";

// Styles
import styles from "./styles.module.scss";

// Actions
import { signup } from "../../actions/signup";

class Signup extends Component {
  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    errors: {
      email: false,
      password: false,
      firstName: false,
      lastName: false
    }
  };
  _handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  _handleBlur = event => {
    const { email, password, firstName, lastName } = this.state;
    const { name } = event.target;
    switch (name) {
      case "email":
        this._handleValidateEmail(email);
        break;
      case "password":
        this._generalValidate(password, name);
        break;
      case "firstName":
        this._generalValidate(firstName, name);
        break;
      case "lastName":
        this._generalValidate(lastName, name);
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
    const { email, firstName, lastName, password } = this.state;
    const { signup, history } = this.props;

    const newUser = { email, firstName, lastName, password };
    if (validateUser(newUser)) {
      const res = await signup(newUser);
      if (res.status === 200) {
        history.push("/login");
      }
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={styles.signup}>
        <H1 className={styles.signupText}>Register now.</H1>
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

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  null,
  { signup }
)(withRouter(Signup));
