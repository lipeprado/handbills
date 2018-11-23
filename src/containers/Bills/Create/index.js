import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import { AppToaster } from "../../../components/Toastr";
// Actions
import { createBill } from "../../../actions/bills";

// Components
import Form from "../Form/";

// Styles
import styles from "./styles.module.scss";

class Create extends Component {
  _handleSubmit = async bill => {
    const { handleModal, createBill } = this.props;
    const newBill = {
      ...bill,
      value: parseInt(bill.value)
    };
    const res = await createBill(newBill);
    if (res) {
      handleModal();
      AppToaster.show({
        message: `${res.title} Created with Success .`,
        intent: "success",
        icon: "thumbs-up"
      });
    }
  };
  render() {
    const { handleModal } = this.props;
    return (
      <div className={styles.portal}>
        <div className={styles.innerModal}>
          <span onClick={handleModal} className={styles.closeModal}>
            <Icon icon="cross" color="#5bb290" />
          </span>
          <h1 className={styles.heading}>Let's Create a new Bill</h1>

          <Form onSubmit={this._handleSubmit} />
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  handleModal: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBill }
)(Create);
