import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "@blueprintjs/core";
import styles from "./styles.module.scss";

const NoBills = ({ modalChange }) => {
  return (
    <div className={styles.nobills}>
      <Icon iconSize={32} icon="error" color="#FFF" />
      <h4 className={styles.nobills__title}>We can't find any bills.</h4>
      <Button
        className="bp3-dark"
        icon="plus"
        onClick={modalChange}
        text="Create One"
      />
    </div>
  );
};

NoBills.propTypes = {
  modalChange: PropTypes.func.isRequired
};

export default NoBills;
