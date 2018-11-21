import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { fetchBills } from "../../actions/bills";

// Components
import Bills from "../../components/Bills";
import ChooseMonth from "../../components/ChooseMonth";

// Styles
import styles from "./styles.module.scss";

class Dashboard extends Component {
  state = {
    bills: []
  };
  componentDidMount = async () => {
    const { fetchBills } = this.props;
    const bills = await fetchBills();
    this.setState({
      bills
    });
  };

  render() {
    const { bills } = this.state;
    return (
      <div className={styles.dashboard}>
        <ChooseMonth />
        <Bills bills={bills} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  bills: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    bills: state.bills.bills
  };
};

export default connect(
  mapStateToProps,
  { fetchBills }
)(Dashboard);
