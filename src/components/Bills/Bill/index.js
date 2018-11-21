import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Bill = ({ bill }) => {
  const { expire } = bill;
  const expireDate = moment(expire).fromNow();
  return (
    <div>
      <p>{bill.title}</p>
      <span>{bill.value}</span>
      <p>{expireDate}</p>
      <span>{bill.status}</span>
    </div>
  );
};

Bill.propTypes = {
  bill: PropTypes.object.isRequired
};

export default Bill;
