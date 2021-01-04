import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Table, Container } from "react-bootstrap";
import actions from "../../../actions/index";
import { removeStoryFromSprint } from "../../../api/stories";
import AddStory from "./AddStory";

class SprintDetail extends React.Component {
  state = {
    storyView: true,
    taskView: false,
    addStory: false,
  };

  componentDidMount() {
    this.props.getStoryForSprint(this.props.auth.token, this.props.sprint._id);
  }

  renderTasks() {
    return (
      <div className="center">
        <br></br>
        <Container>
          <h3>Tasks</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{this.tasks()}</tbody>
          </Table>
        </Container>
      </div>
    );
  }

  tasks() {
    return this.props.sprint_story.map((s, index) => {
      return (
        <tr key={index}>
          <td>{s.name}</td>
          <td>{s.description}</td>
          <td>
            <Button onClick={() => this.removeStory(s)} variant="warning">
              Remove
            </Button>
          </td>
        </tr>
      );
    });
  }

  renderStories() {
    return (
      <div className="center">
        <br></br>
        <Container>
          <h3>Stories</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{this.stories()}</tbody>
          </Table>
        </Container>
      </div>
    );
  }

  stories() {
    return this.props.sprint_story.map((s, index) => {
      return (
        <tr key={index}>
          <td>{s.name}</td>
          <td>{s.description}</td>
          <td>
            <Button onClick={() => this.removeStory(s)} variant="warning">
              Remove
            </Button>
          </td>
        </tr>
      );
    });
  }

  removeStory(s) {
    removeStoryFromSprint(this.props.auth.token, s._id);
    this.props.getStoryForSprint(this.props.auth.token, this.props.sprint._id);
  }

  renderChoice() {
    return (
      <div className="sprintDetail">
        <div>
          <Row>
            <Col xs={12}>Sprint {this.props.index + 1}</Col>

            <Col xs={6}>
              Start Date: {this.props.sprint.startDate.split("T")[0]}
            </Col>

            <Col xs={6}>
              End Date: {this.props.sprint.endDate.split("T")[0]}
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xs={6}>
              <Button
                onClick={() =>
                  this.setState({ storyView: false, taskView: true })
                }
                variant={this.state.taskView ? "success" : "danger"}
              >
                Tasks
              </Button>
            </Col>

            <Col xs={6}>
              <Button
                onClick={() =>
                  this.setState({ storyView: true, taskView: false })
                }
                variant={this.state.storyView ? "success" : "danger"}
              >
                Stories
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.addStory) {
      return (
        <div>
          {this.renderChoice()}
          <AddStory />
          <div className="center">
            <Button
              className="newStoryButton margin"
              variant="dark"
              onClick={() => {
                this.setState({ addStory: false });
                this.props.getStoryForSprint(
                  this.props.auth.token,
                  this.props.sprint._id
                );
              }}
            >
              Back
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderChoice()}
        {this.state.storyView ? this.renderStories() : this.renderTasks()}
        <div className="center">
          <Button
            className="newStoryButton margin"
            variant="success"
            onClick={() => this.setState({ addStory: true })}
          >
            Add Project Stories To Sprint
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, sprint_story, task }) => {
  return { auth, sprint_story, task };
};

export default connect(mapStateToProps, actions)(SprintDetail);
