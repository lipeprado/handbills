import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { Row, Col } from "react-flexbox-grid";
import LOGO from "../../static/images/logo.svg";

import ChooseMonth from "../../components/ChooseMonth";

import styles from "./styles.module.scss";

class NavBar extends Component {
  _handleModal = () => {
    const { handleModal } = this.props;
    handleModal();
  };
  render() {
    const { currentUser, onLogout } = this.props;
    return (
      <Navbar className="bp3-minimal bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading className={styles.wrapperLogo}>
            <img className={styles.logo} src={LOGO} alt="LOGO" />
            <span>Handbills</span>
          </Navbar.Heading>
          <Navbar.Divider />
          <Button
            className="bp3-minimal bp3-dark"
            icon="plus"
            onClick={this._handleModal}
            text="New Bill"
          />
          <Navbar.Divider />

          <Row between="xs">
            <Col>
              <ChooseMonth />
            </Col>
          </Row>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Row between="xs">
            <Col>
              <Button
                className="bp3-minimal bp3-dark"
                icon="user"
                text={`${currentUser.data &&
                  currentUser.data.firstName} ${currentUser.data &&
                  currentUser.data.lastName}`}
              />
              <Button
                className="bp3-minimal bp3-dark"
                icon="log-out"
                onClick={onLogout}
                text="Logout"
              />
            </Col>
          </Row>
        </Navbar.Group>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default NavBar;
