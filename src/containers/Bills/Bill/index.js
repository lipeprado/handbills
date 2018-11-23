import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Icon } from "@blueprintjs/core";
import styles from "./styles.module.scss";
import Dinero from "dinero.js";

const Bill = ({ bill }) => {
  const { expire, value } = bill;
  const expireDate = moment(expire).format("L");
  const price = Dinero({
    amount: parseInt(value),
    currency: "BRL"
  })
    .setLocale("pt-BR")
    .toFormat("$0,0.00");
  return (
    <div className={styles.bill}>
      <div className={styles.bill__inner}>
        <h4 className={styles.bill__title}>{bill.title}</h4>
        <span className={styles.bill__expire}>{expireDate}</span>
      </div>
      <div>
        <span className={styles.bill__value}>{price}</span>
        <div className={styles.bill__status}>
          <Icon
            icon={bill.status ? "tick" : "small-tick"}
            color={bill.status ? "#5bb290" : "#394b59"}
          />
        </div>
      </div>
    </div>
  );
};

Bill.propTypes = {
  bill: PropTypes.object.isRequired
};

export default Bill;
