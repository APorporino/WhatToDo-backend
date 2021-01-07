import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Table,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import actions from "../../../actions/index";
import { removeStoryFromSprint } from "../../../api/stories";
import { updateTask } from "../../../api/task";
import AddStory from "./AddStory";

class SprintDetail extends React.Component {
  state = {
    storyView: true,
    taskView: false,
    addStory: false,
  };

  componentDidMount() {
    this.props.getStoryForSprint(this.props.auth.token, this.props.sprint._id);
    this.props.getSprintTasks(this.props.auth.token, this.props.sprint._id);
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
                <th>Number</th>
                <th>Description</th>
                <th>Status</th>
                <th>Tag</th>
                <th>Completed</th>
                <th>AssignedTo</th>
              </tr>
            </thead>
            <tbody>{this.tasks()}</tbody>
          </Table>
        </Container>
      </div>
    );
  }

  updateTaskInfo = (taskId, updateObject) => {
    updateTask(this.props.auth.token, taskId, updateObject);
    this.props.getSprintTasks(this.props.auth.token, this.props.sprint._id);
  };

  tasks() {
    return this.props.sprint_task.map((t, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{t.description}</td>
          <td>
            <DropdownButton
              id="dropdown-basic-button"
              title={t.status}
              variant="secondary"
              onSelect={(e) => this.updateTaskInfo(t._id, { status: e })}
            >
              <Dropdown.Item eventKey="Not Started">Not Started</Dropdown.Item>
              <Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
              <Dropdown.Item eventKey="Stuck">Stuck</Dropdown.Item>
              <Dropdown.Item eventKey="Almost Complete">
                Almost Complete
              </Dropdown.Item>
              <Dropdown.Item eventKey="Done">Done</Dropdown.Item>
            </DropdownButton>
          </td>
          <td>
            <DropdownButton
              id="dropdown-basic-button"
              title={t.tag}
              variant="light"
              onSelect={(e) => this.updateTaskInfo(t._id, { tag: e })}
            >
              <Dropdown.Item eventKey="Dev">Dev</Dropdown.Item>
              <Dropdown.Item eventKey="Database">Database</Dropdown.Item>
              <Dropdown.Item eventKey="Architecture">
                Architecture
              </Dropdown.Item>
              <Dropdown.Item eventKey="Testing">Testing</Dropdown.Item>
            </DropdownButton>
          </td>
          <td>
            <DropdownButton
              className="buttonColor"
              id="dropdown-basic-button"
              title={t.completed.toString()}
              variant={t.completed ? "success" : "danger"}
              onSelect={(e) => this.updateTaskInfo(t._id, { completed: e })}
            >
              <Dropdown.Item eventKey="true">True</Dropdown.Item>
              <Dropdown.Item eventKey="false">False</Dropdown.Item>
            </DropdownButton>
          </td>
          <td>
            <DropdownButton
              id="dropdown-basic-button"
              title={t.assignedTo}
              variant="dark"
              onSelect={(e) => this.updateTaskInfo(t._id, { assignedTo: e })}
            >
              {this.renderMembers()}
            </DropdownButton>
          </td>
        </tr>
      );
    });
  }

  renderMembers() {
    return this.props.project.members.map((m, index) => {
      return (
        <Dropdown.Item key={index} eventKey={m}>
          {m}
        </Dropdown.Item>
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
    this.props.getSprintTasks(this.props.auth.token, this.props.sprint._id);
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
          <AddStory sprint={this.props.sprint} />
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

const mapStateToProps = ({ auth, sprint_story, sprint_task, project }) => {
  return { auth, sprint_story, sprint_task, project };
};

export default connect(mapStateToProps, actions)(SprintDetail);
