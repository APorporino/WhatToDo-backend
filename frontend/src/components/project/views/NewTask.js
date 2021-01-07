import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTask } from "../../../api/stories";
import { Form, Button, Alert } from "react-bootstrap";
import history from "../../../history";

class NewProject extends React.Component {
  state = { status: "Not started", description: "", tag: "Dev" };

  handleSubmit = (event) => {
    createTask(
      this.props.auth.token,
      this.props.story._id,
      this.state.description,
      this.state.status,
      this.state.tag
    );
    localStorage.setItem("PreviousView", "BacklogView");
    history.push(`/projectPage/${this.props.project.name}`);
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="taskForm">
        <h1 style={{ textAlign: "center" }}>
          New task for story: {this.props.story.name}
        </h1>
        <Form onSubmit={this.handleSubmit} className="form-block">
          <Form.Group controlId="formName">
            <Form.Label>Description of Task</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name of task"
              value={this.state.description}
              onChange={(e) =>
                this.setState({
                  description: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter status of the story"
              value={this.state.status}
              onChange={(e) =>
                this.setState({
                  status: e.target.value,
                })
              }
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Stuck</option>
              <option>Almost Complete</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter status of the story"
              value={this.state.tag}
              onChange={(e) =>
                this.setState({
                  tag: e.target.value,
                })
              }
            >
              <option>Dev</option>
              <option>Database</option>
              <option>Architecture</option>
              <option>Other</option>
            </Form.Control>
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
export default connect(mapStateToProps)(NewProject);
