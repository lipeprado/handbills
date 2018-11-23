/* eslint-disable no-sequences */
import moment from "moment";
import Dinero from "dinero.js";

export const validateEmail = email => {
  const parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return parse_email.test(email);
};

export const validateUser = user => {
  const hasFirstName =
    typeof user.firstName === "string" && user.firstName.trim() !== "";
  const hasLastName =
    typeof user.lastName === "string" && user.lastName.trim() !== "";
  const hasEmail =
    typeof user.email === "string" &&
    user.email.trim() !== "" &&
    validateEmail(user.email);
  const hasPassword =
    typeof user.password === "string" && user.password.trim() !== "";
  return hasFirstName && hasLastName && hasEmail && hasPassword;
};

export const formatDateBills = bills => {
  return bills.map(bill => {
    const formatBill = {
      ...bill,
      expire: moment(bill.expire).format("LLLL"),
      created_at: moment(bill.created_at).format("LLLL"),
      updated_at: moment(bill.updated_at).format("LLLL")
    };
    return formatBill;
  });
};

export const formatSelect = data => {
  return data.map(d => {
    return {
      value: d,
      label: d
    };
  });
};

export const sumValue = arr => {
  const total = arr.reduce((acc, amount) => {
    return acc + parseInt(amount.value);
  }, 0);
  return Dinero({
    amount: parseInt(total),
    currency: "BRL"
  })
    .setLocale("pt-BR")
    .toFormat("$0,0.00");
};

export const sumUnpaid = arr => {
  const unpaids = arr.filter(item => !item.status);
  const total = unpaids.reduce((acc, amount) => {
    return acc + parseInt(amount.value);
  }, 0);
  return Dinero({
    amount: parseInt(total),
    currency: "BRL"
  })
    .setLocale("pt-BR")
    .toFormat("$0,0.00");
};

export const sumPaid = arr => {
  const unpaids = arr.filter(item => item.status);
  const total = unpaids.reduce((acc, amount) => {
    return acc + parseInt(amount.value);
  }, 0);
  return Dinero({
    amount: parseInt(total),
    currency: "BRL"
  })
    .setLocale("pt-BR")
    .toFormat("$0,0.00");
};
