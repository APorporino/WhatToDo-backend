import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import actions from "../../actions/index";
import { Form, Button, Alert } from "react-bootstrap";
import history from "../../history";

class NewProject extends React.Component {
  state = { name: "", description: "" };

  handleSubmit = (event) => {
    this.props.createProject(
      this.props.auth.token,
      this.state.name,
      this.state.description
    );
    history.push(`/home`);
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }

    // if (this.props.project) {
    //   const redirect = `/projectPage/${this.props.project.name}`;
    //   return <Redirect to={redirect} />;
    // }

    return (
      <div className="SmallForm">
        <Form onSubmit={this.handleSubmit} className="form-block">
          <Form.Group controlId="formName">
            <Form.Label>Name of Project</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name of project"
              value={this.state.name}
              onChange={(e) =>
                this.setState({
                  name: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description of Project</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter a description of the project"
              value={this.state.description}
              onChange={(e) =>
                this.setState({
                  description: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button block bssize="large" type="submit">
            Submit
          </Button>
          <div
            style={{
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            {this.props.error ? (
              <Alert key={2} variant="danger">
                {this.props.error}
              </Alert>
            ) : (
              ""
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error }) => {
  return { auth, project, error };
};
export default connect(mapStateToProps, actions)(NewProject);
