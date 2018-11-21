import React from "react";
import PropTypes from "prop-types";
import { FormGroup, InputGroup, Button, Label } from "@blueprintjs/core";

// Styles
import styles from "./styles.module.scss";

const Form = ({ errors, onBlur, onChange, onSubmit }) => {
  return (
    <div className={styles.wrapperForm}>
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
