import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import actions from "../../../actions/index";
import { findUserByEmail } from "../../../api/user";

class MemberView extends React.Component {
  state = { email: "", users: [] };

  timeoutId = null;

  handleSearch = (value) => {
    const dummySearch = (id) => {
      clearTimeout(id);

      this.timeoutId = setTimeout(() => {
        this.setState({ email: value });
        this.findUser();
      }, 1000);
    };
    dummySearch(this.timeoutId);
  };

  renderListGroup(list) {
    return list.map((element, index) => {
      return (
        <ListGroup.Item variant="warning" key={index}>
          {element}
        </ListGroup.Item>
      );
    });
  }

  renderListUsers(list) {
    console.log("LIST: ", list);
    if (list.length === 0) {
      return <div>No users found</div>;
    }
    return list.map((element, index) => {
      return (
        <ListGroup.Item variant="success" key={index}>
          {element.email}
          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Add
          </Button>
        </ListGroup.Item>
      );
    });
  }

  async findUser() {
    const users = await findUserByEmail(
      this.props.auth.token,
      this.state.email
    );
    if (Array.isArray(users)) {
      this.setState({ users });
    } else {
      this.setState({ users: [] });
    }
  }

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }
    if (!this.props.project) {
      return (
        <div>
          Loading <Spinner animation="grow" />{" "}
        </div>
      );
    }

    return (
      <div>
        <Row className="member_page">
          <Col md={4} xs={12}>
            <h3>Members</h3>
            <ListGroup className="member_list">
              {this.renderListGroup(this.props.project.members)}
            </ListGroup>
          </Col>
          <Col md={4} xs={12}>
            <h3>Admins</h3>
            <ListGroup className="member_list">
              {this.renderListGroup(this.props.project.admins)}
            </ListGroup>
          </Col>
          <Col md={4} xs={12}>
            <h3>Add New Member</h3>
            <Form
              className="search_bar"
              onChange={(e) => this.handleSearch(e.target.value)}
              onSubmit={this.handleSearch}
            >
              <Form.Group controlId="formPlaintextPassword">
                <Form.Control type="" placeholder="Email of user" />
              </Form.Group>
              <ListGroup className="member_list">
                {this.renderListUsers(this.state.users)}
              </ListGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error, userList }) => {
  return { auth, project, error, userList };
};

export default connect(mapStateToProps, actions)(MemberView);
