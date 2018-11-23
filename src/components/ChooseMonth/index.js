import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@blueprintjs/core";

// Actions
import { setMonth } from "../../actions/calendar";
import { fetchBills } from "../../actions/bills";

// Styles
import styles from "./styles.module.scss";

class ChooseMonth extends Component {
  state = {
    current: {}
  };

  componentWillMount() {
    const { month } = this.props;
    this.setState({
      current: month
    });
  }

  _handleIncrease = () => {
    const { current } = this.state;
    const { setMonth, fetchBills } = this.props;
    const nextMonth = moment(current, "MMMM")
      .add(1, "months")
      .format("MMMM");
    this.setState({
      current: nextMonth
    });
    setMonth(nextMonth);
    fetchBills(nextMonth);
  };

  _handleDecrease = () => {
    const { current } = this.state;
    const { setMonth, fetchBills } = this.props;
    const nextMonth = moment(current, "MMMM")
      .subtract(1, "months")
      .format("MMMM");
    this.setState({
      current: nextMonth
    });
    setMonth(nextMonth);
    fetchBills(nextMonth);
  };
  render() {
    const { month } = this.props;
    return (
      <div className={styles.calendar}>
        <div className={styles.calendar__month}>
          <Icon
            className={styles.calendar__Changemonth}
            iconSize={16}
            onClick={this._handleDecrease}
            icon="chevron-left"
          />
          <h1>{month}</h1>
          <Icon
            className={styles.calendar__Changemonth}
            iconSize={16}
            icon="chevron-right"
            onClick={this._handleIncrease}
          />
        </div>
      </div>
    );
  }
}

ChooseMonth.propTypes = {
  months: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    months: state.calendar.months,
    days: state.calendar.days,
    month: state.calendar.month,
    today: state.calendar.today
  };
};

export default connect(
  mapStateToProps,
  { setMonth, fetchBills }
)(ChooseMonth);
