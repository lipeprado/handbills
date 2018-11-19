import React, { Component } from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";

class index extends Component {
  render() {
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
          <Button className="bp3-minimal bp3-dark" icon="user" text="Profile" />
          <Button
            className="bp3-minimal bp3-dark"
            icon="log-out"
            text="Logout"
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}

index.propTypes = {};

export default index;
