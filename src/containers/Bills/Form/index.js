import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  InputGroup,
  Button,
  Label,
  Checkbox,
  Alignment
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Row, Col } from "react-flexbox-grid";
import Dinero from "dinero.js";
import moment from "moment";

// Styles
import styles from "./styles.module.scss";

class Form extends Component {
  state = {
    title: "",
    value: "10000",
    expire: Date.now(),
    status: false,
    titleError: false,
    valueError: false
  };

  _handleChange = e => {
    const { value, name } = e.target;
    const { status } = this.state;
    if (name === "status") {
      this.setState({
        [name]: !status
      });
    } else {
      this.setState({
        [name]: value,
        titleError: false
      });
    }
  };

  _handleNumericChange = event => {
    const { value, name } = event.target;
    let replaced = value;
    if (value.includes("R$")) {
      replaced = value.replace(/\D/g, "");
    }
    this.setState({
      [name]: replaced
    });
  };

  _formatMoney = value => {
    return Dinero({
      amount: parseInt(value),
      currency: "BRL"
    })
      .setLocale("pt-BR")
      .toFormat("$0,0.00");
  };
  _handleDateChange = (event, another) => {
    const month = moment(event).format("M");
    const year = moment(event).format("YYYY");
    this.setState({
      expire: event,
      year,
      month
    });
  };
  _handleSubmit = () => {
    const { onSubmit } = this.props;
    const { title, value, status, expire, month, year } = this.state;
    const bill = {
      title,
      value,
      status,
      expire,
      month,
      year
    };
    if (!title) {
      this.setState({
        titleError: true
      });
    }
    if (!value) {
      this.setState({
        valueError: true
      });
    }
    if (title && value) {
      onSubmit(bill);
    }
  };
  render() {
    const { value, status, titleError, valueError } = this.state;
    const dinheiro = this._formatMoney(value);
    return (
      <Row start="xs">
        <Col xs={12} md={12}>
          <FormGroup className={styles.input}>
            <InputGroup
              onChange={this._handleChange}
              name="title"
              type="text"
              intent={titleError ? "danger" : "none"}
              className={`bp3-minimal bp3-dark `}
              placeholder="Name your Bill..."
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <FormGroup className={styles.input}>
            {valueError && (
              <Label className={styles.inputError}>Value is Required</Label>
            )}
            <InputGroup
              name="value"
              className={`bp3-minimal bp3-dark `}
              value={dinheiro}
              placeholder="Value of your Bill..."
              onChange={this._handleNumericChange}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <DateInput
            onChange={this._handleDateChange}
            formatDate={date =>
              moment(date)
                .locale("pt-Br")
                .format("l")
            }
            parseDate={date => new Date(date)}
            locale="pt-Br"
            placeholder={"Expire date"}
            className={`bp3-dark ${styles.inputDate}`}
          />
        </Col>

        <Col xs={12} md={6}>
          <Checkbox
            name="status"
            className={styles.status}
            checked={status}
            label="Conta Paga"
            onChange={this._handleChange}
          />
        </Col>
        <Col md={12}>
          <Button
            fill
            alignText={Alignment.CENTER}
            onClick={this._handleSubmit}
            large
            text="Create Bill"
            intent="success"
          />
        </Col>
      </Row>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Form;
