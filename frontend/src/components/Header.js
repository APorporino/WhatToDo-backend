import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import actions from "../actions/index";

class Header extends React.Component {
  renderRightSide() {
    switch (this.props.auth) {
      case null:
        return <div>Null</div>;

      case false:
        return (
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        );

      default:
        return (
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
            <Nav.Link href="/">{this.props.auth.user.email}</Nav.Link>
          </Nav>
        );
    }
  }

  render() {
    return (
      <div>
        <Navbar className="header">
          <Navbar.Brand href="/">WhatToDo</Navbar.Brand>
          <NavDropdown className="black" title="Color Theme" id="nav-dropdown">
            <NavDropdown.Item eventKey="Blue">Blue</NavDropdown.Item>
            <NavDropdown.Item eventKey="Orange">Orange</NavDropdown.Item>
            <NavDropdown.Item eventKey="Grey">Grey</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.4">Red</NavDropdown.Item>
          </NavDropdown>
          {this.renderRightSide()}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(Header);
