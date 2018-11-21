import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Bill from "./Bill";

// Styles
import styles from "./styles.module.scss";

class Bills extends Component {
  render() {
    const { bills } = this.props;
    return (
      <div className={styles.wrapperBills}>
        {bills.map(bill => {
          return <Bill key={bill.id} bill={bill} />;
        })}
      </div>
    );
  }
}

Bills.propTypes = {
  bills: PropTypes.array.isRequired
};

export default Bills;
