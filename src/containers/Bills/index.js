import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash/";

// Components
import Bill from "./Bill";

// Styles
import styles from "./styles.module.scss";

class Bills extends Component {
  render() {
    const { bills } = this.props;
    return (
      <div>
        <div className={styles.wrapperBills}>
          {!isEmpty(bills) ? (
            bills.map(bill => {
              return <Bill key={bill.id} bill={bill} />;
            })
          ) : (
            <h4>No bills yet.</h4>
          )}
        </div>
      </div>
    );
  }
}

Bills.propTypes = {
  bills: PropTypes.array.isRequired,
  modalOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    modalOpen: state.ui.modalOpen
  };
};
export default connect(mapStateToProps)(Bills);
