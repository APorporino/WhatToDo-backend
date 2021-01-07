import React from "react";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import actions from "../actions/index";

class Header extends React.Component {
  state = { color: "blue" };

  changeTheme = (e) => {
    console.log(e);
    switch (e) {
      case "orange":
        console.log("o");
        document.documentElement.style.setProperty("--main-color", "#ffbb84fd");
        document.documentElement.style.setProperty(
          "--secondary-color",
          "#e79427"
        );
        break;
      case "red":
        console.log("r");
        document.documentElement.style.setProperty("--main-color", "#e29c93fd");
        document.documentElement.style.setProperty(
          "--secondary-color",
          "#c73535"
        );
        break;
      case "blue":
        console.log("b");
        document.documentElement.style.setProperty("--main-color", "#9aceff");
        document.documentElement.style.setProperty(
          "--secondary-color",
          "#4a69bb"
        );
        break;
      case "white":
        console.log("b");
        document.documentElement.style.setProperty("--main-color", "#0000000");
        document.documentElement.style.setProperty("--secondary-color", "grey");
        break;
      case "green":
        console.log("b");
        document.documentElement.style.setProperty("--main-color", "#a8f176fd");
        document.documentElement.style.setProperty(
          "--secondary-color",
          "#59b921"
        );
        break;
    }
    this.setState({ color: e });
  };

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
            <Nav.Link
              href="/"
              // onClick={localStorage.setItem("PreviousView", "")}
            >
              Home
            </Nav.Link>
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
          <DropdownButton
            className="buttonColor"
            id="dropdown-basic-button"
            title="Color Theme"
            variant="light"
            onSelect={this.changeTheme}
          >
            <Dropdown.Item eventKey="blue">Blue</Dropdown.Item>
            <Dropdown.Item eventKey="orange">Orange</Dropdown.Item>
            <Dropdown.Item eventKey="red">Red</Dropdown.Item>
            <Dropdown.Item eventKey="green">Green</Dropdown.Item>
            <Dropdown.Item eventKey="white">White</Dropdown.Item>
          </DropdownButton>
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
