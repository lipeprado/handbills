import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Icon, Popover, Button, Alignment, Classes } from "@blueprintjs/core";
import styles from "./styles.module.scss";
import Dinero from "dinero.js";
import { AppToaster } from "../../../components/Toastr";

class Bill extends Component {
  state = {
    isDeleting: false
  };

  _handlePopOver = () => {
    this.setState({
      isDeleting: !this.state.isDeleting
    });
  };

  _handleDelete = async () => {
    const { bill, onDelete } = this.props;
    this.setState({ isDeleting: false });
    const res = await onDelete(bill.id);
    if (res) {
      AppToaster.show({
        message: `Deleted with Success .`,
        intent: "warning",
        icon: "thumbs-up"
      });
    }
  };

  _handlePaid = async () => {
    const { bill, onStatusChange } = this.props;
    const res = await onStatusChange(bill.id);
    if (res) {
      AppToaster.show({
        timeout: 1000,
        message: `Status changed with Success .`,
        intent: "success",
        icon: "thumbs-up"
      });
    }
  };
  render() {
    const { isDeleting } = this.state;
    const { expire, value } = this.props.bill;
    const expireDate = moment(expire).format("L");
    const price = Dinero({
      amount: parseInt(value),
      currency: "BRL"
    })
      .setLocale("pt-BR")
      .toFormat("$0,0.00");
    return (
      <div className={styles.bill}>
        <Popover
          popoverClassName={Classes.DARK}
          isOpen={isDeleting}
          canEscapeKeyClose
          position={Alignment.RIGHT}
          className={styles.bill__delete}
        >
          <span className={styles.wrapperButton} onClick={this._handlePopOver}>
            <Icon iconSize={12} icon="trash" />
          </span>
          <div className={styles.wrapperButton__content}>
            <h4>Deseja Excluír?</h4>
            <Button
              onClick={this._handleDelete}
              intent="success"
              text="Pode excluír."
            />
            <Button
              onClick={this._handlePopOver}
              intent="danger"
              text="Não, Cancela."
            />
          </div>
        </Popover>
        <div className={styles.bill__inner}>
          <h4 className={styles.bill__title}>{this.props.bill.title}</h4>
          <span className={styles.bill__expire}>{expireDate}</span>
        </div>
        <div>
          <span className={styles.bill__value}>{price}</span>
          <div onClick={this._handlePaid} className={styles.bill__status}>
            <Icon
              icon={this.props.bill.status ? "tick" : "small-tick"}
              color={this.props.bill.status ? "#5bb290" : "#394b59"}
            />
          </div>
        </div>
      </div>
    );
  }
}

Bill.propTypes = {
  bill: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default Bill;
