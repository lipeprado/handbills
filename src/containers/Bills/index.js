import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash/";

// Actions
import { deleteBill, statusBill } from "../../actions/bills";

// Components
import Bill from "./Bill";

// Styles
import styles from "./styles.module.scss";

class Bills extends Component {
  render() {
    const { bills, deleteBill, statusBill } = this.props;
    return (
      <div>
        <div className={styles.wrapperBills}>
          {!isEmpty(bills) ? (
            bills.map(bill => {
              return (
                <Bill
                  onStatusChange={statusBill}
                  onDelete={deleteBill}
                  key={bill.id}
                  bill={bill}
                />
              );
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
  modalOpen: PropTypes.bool.isRequired,
  month: PropTypes.string.isRequired,
  deleteBill: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    modalOpen: state.ui.modalOpen,
    month: state.calendar.month
  };
};
export default connect(
  mapStateToProps,
  { deleteBill, statusBill }
)(Bills);
