import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alignment, Button, Navbar } from "@blueprintjs/core";

class index extends Component {
  render() {
    const { currentUser, onLogout } = this.props;
    return (
      <Navbar className="bp3-minimal bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Handbills</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal bp3-dark" icon="home" text="Home" />
          <Button
            className="bp3-minimal bp3-dark"
            icon="plus"
            text="New Bill"
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
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
        </Navbar.Group>
      </Navbar>
    );
  }
}

index.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default index;
