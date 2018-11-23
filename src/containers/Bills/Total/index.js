import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Total = ({ total, text }) => {
  return (
    <div className={styles.total}>
      <h4 className={styles.total__title}>{text} </h4>
      <span className={styles.total__value}>{total}</span>
    </div>
  );
};

Total.propTypes = {
  total: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Total;
