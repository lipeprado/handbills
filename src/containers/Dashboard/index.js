import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col } from "react-flexbox-grid";
import { Spinner } from "@blueprintjs/core";

// Helpers
import { sumValue, sumUnpaid, sumPaid } from "../../helpers";

// Actions
import { fetchBills } from "../../actions/bills";

// Components
import Total from "../Bills/Total";
import Bills from "../Bills";

// Styles
import styles from "./styles.module.scss";

class Dashboard extends Component {
  state = {
    bills: []
  };
  componentDidMount = async () => {
    const { fetchBills } = this.props;
    const month = moment().format("MMMM");
    const bills = await fetchBills(month);
    this.setState({
      bills
    });
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.bills !== nextProps.bills) {
      this.setState({
        bills: nextProps.bills
      });
    }
  };

  render() {
    const { bills } = this.state;
    const { isFetching } = this.props;
    return (
      <div className={styles.dashboard}>
        <Row between="xs">
          {isFetching ? (
            <div className={styles.wrapperLoading}>
              <Spinner intent="success" size={20} tagName="span" />
              <span>Loading...</span>
            </div>
          ) : (
            <Fragment>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>Contas à Pagar</h4>
                <Bills bills={bills.filter(item => !item.status)} />
              </Col>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>Contas Pagas</h4>
                <Bills bills={bills.filter(item => item.status)} />
              </Col>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>Balanço das Contas</h4>
                <Total text="Total" total={sumValue(bills)} />
                <Total text="Contas a Pagar" total={sumUnpaid(bills)} />
                <Total text="Contas Pagas" total={sumPaid(bills)} />
              </Col>
            </Fragment>
          )}
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  bills: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    bills: state.bills.bills,
    isFetching: state.bills.isFetching
  };
};

export default connect(
  mapStateToProps,
  { fetchBills }
)(Dashboard);
