import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col } from "react-flexbox-grid";
import { Spinner } from "@blueprintjs/core";
import _ from "lodash";

// Helpers
import { sumValue, sumUnpaid, sumPaid, balance } from "../../helpers";

// Actions
import { fetchBills } from "../../actions/bills";
import { modalChange } from "../../actions/ui";

// Components
import Total from "../Bills/Total";
import Bills from "../Bills";

// Styles
import styles from "./styles.module.scss";
import NoBills from "../../components/NoBills";

class Dashboard extends Component {
  state = {
    bills: []
  };

  componentDidMount = async () => {
    const { fetchBills } = this.props;
    const month = moment().format("MMMM");
    const bills = await fetchBills(month);
    this.setState({ bills });
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.state.bills !== nextProps.bills) {
      this.setState({
        bills: nextProps.bills
      });
    }
  };
  render() {
    const { isFetching, modalChange } = this.props;
    const { bills } = this.state;
    const paid = bills.filter(bill => bill.status);
    const unpaid = bills.filter(bill => !bill.status);
    console.log({ paid, unpaid });
    return (
      <div className={styles.dashboard}>
        <Row between="xs">
          {isFetching ? (
            <div className={styles.wrapperLoading}>
              <Spinner intent="success" size={20} tagName="span" />
              <span>Loading...</span>
            </div>
          ) : !_.isEmpty(bills) ? (
            <Fragment>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>
                  <span>{unpaid.length}</span> Contas à Pagar
                </h4>
                <Bills bills={unpaid} />
              </Col>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>
                  <span>{paid.length}</span> Contas Pagas
                </h4>
                <Bills bills={paid} />
              </Col>
              <Col xs={12} md={4}>
                <h4 className={styles.labelTitle}>Balanço das Contas</h4>
                <Total text="Total" total={sumValue(bills)} />
                <Total text="Contas a Pagar" total={sumUnpaid(unpaid)} />
                <Total text="Contas Pagas" total={sumPaid(paid)} />
                <Total
                  text="Balanço das Contas"
                  total={balance(bills, 900000)}
                />
              </Col>
            </Fragment>
          ) : (
            <NoBills modalChange={modalChange} />
          )}
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  bills: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  modalChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    bills: state.bills.bills,
    isFetching: state.bills.isFetching
  };
};

export default connect(
  mapStateToProps,
  { fetchBills, modalChange }
)(Dashboard);
