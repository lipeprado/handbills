import React from "react";
import PropTypes from "prop-types";
import { FormGroup, InputGroup, Button, Label } from "@blueprintjs/core";

import styles from "./styles.module.scss";

const Form = ({ errors, onBlur, onChange, onSubmit }) => {
  return (
    <div className={styles.wrapperForm}>
      <FormGroup className={styles.input}>
        {errors.firstName && (
          <Label className={styles.inputError}>First name is Required</Label>
        )}
        <InputGroup
          onChange={onChange}
          onBlur={onBlur}
          name="firstName"
          type="text"
          large
          intent={errors.firstName ? "danger" : "none"}
          className={`bp3-minimal bp3-dark`}
          placeholder="First name..."
        />
      </FormGroup>
      <FormGroup className={styles.input}>
        {errors.lastName && (
          <Label className={styles.inputError}>Last name is Required</Label>
        )}

        <InputGroup
          onChange={onChange}
          onBlur={onBlur}
          name="lastName"
          type="text"
          large
          intent={errors.lastName ? "danger" : "none"}
          className={`bp3-minimal bp3-dark`}
          placeholder="Last name..."
        />
      </FormGroup>
      <FormGroup className={styles.input}>
        {errors.email && (
          <Label className={styles.inputError}>Email is Required</Label>
        )}
        <InputGroup
          onChange={onChange}
          onBlur={onBlur}
          name="email"
          type="text"
          large
          intent={errors.email ? "danger" : "none"}
          className={`bp3-minimal bp3-dark `}
          placeholder="Email..."
        />
      </FormGroup>

      <FormGroup className={styles.input}>
        {errors.password && (
          <Label className={styles.inputError}>Password is Required</Label>
        )}
        <InputGroup
          onChange={onChange}
          onBlur={onBlur}
          name="password"
          large
          intent={errors.password ? "danger" : "none"}
          type="password"
          className={`bp3-minimal bp3-dark`}
          placeholder="Password..."
        />
      </FormGroup>

      <Button onClick={onSubmit} large text="Register now" intent="success" />
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default Form;
