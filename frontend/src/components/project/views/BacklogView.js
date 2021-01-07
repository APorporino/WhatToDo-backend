import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import actions from "../../../actions";
import NewTask from "./NewTask.js";
import { deleteStory } from "../../../api/stories";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import history from "../../../history";

class BacklogView extends React.Component {
  state = { redirect: false, newTask: null };

  componentDidMount() {
    this.getStories();
  }

  getStories = async () => {
    await this.props.getBacklogStories(
      this.props.project.backlog,
      this.props.auth.token
    );
    if (this.props.story) {
      this.props.story.forEach((story) => {
        story["tasksVisible"] = false;
      });
    }
  };

  renderStories() {
    //this.getStories();
    if (this.props.story == null) {
      return null;
    }
    return this.props.story.map((story, index) => {
      return (
        <div key={index} style={{ margin: "2%" }}>
          <Row>
            <Col lg={9} md={12} xs={12}>
              <ListGroup.Item style={{ verticalAlign: "middle" }}>
                {story.name}:{story.description}
              </ListGroup.Item>
            </Col>

            <Col lg={1} md={4} xs={4}>
              <Button
                variant="secondary"
                onClick={() => this.handleViewTask(story)}
                style={{
                  float: "right",
                  marginBottom: "10%",
                  verticalAlign: "middle",
                }}
              >
                View Tasks
              </Button>
            </Col>

            <Col lg={1} md={4} xs={4}>
              <Button
                variant="success"
                onClick={() => this.setState({ newTask: story })}
              >
                New Task
              </Button>
            </Col>

            <Col lg={1} md={4} xs={4}>
              <Button
                variant="danger"
                onClick={async () => {
                  await deleteStory(this.props.auth.token, story._id);
                  history.push(`/projectPage/${this.props.project.name}`);
                }}
              >
                Delete Story
              </Button>
            </Col>
          </Row>
          <br></br>
          <ListGroup hidden={!story.tasksVisible}>
            {this.renderTasks(story)}
          </ListGroup>
        </div>
      );
    });
  }

  renderTasks = (story) => {
    if (story.tasks.length === 0) {
      return (
        <ListGroup.Item action variant="warning">
          No tasks yet for this story
        </ListGroup.Item>
      );
    }
    return story.tasks.map((task, index) => {
      return (
        <ListGroup.Item action variant="info" key={index}>
          DESCRIPTION: {task.description} | STATUS: {task.status} | TAG:{" "}
          {task.tag}
        </ListGroup.Item>
      );
    });
  };

  handleViewTask = (inputStory) => {
    const currentStories = this.props.story;
    var newStories = currentStories.map((story) => {
      if (story === inputStory) {
        story["tasksVisible"] = !story.tasksVisible;
        return story;
      }
      return story;
    });
    this.setState({
      stories: newStories,
    });
  };

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/new/story" />;
    }
    if (this.state.newTask) {
      return <NewTask story={this.state.newTask} />;
    }
    return (
      <div className="center">
        <Container>
          <h3>Stories</h3>
          <ListGroup style={{ textAlign: "left" }}>
            {this.renderStories()}
          </ListGroup>
        </Container>
        <Button
          className="newStoryButton margin"
          variant="success"
          onClick={this.handleClick}
        >
          New Story
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, story }) => {
  return { auth, project, story };
};

export default connect(mapStateToProps, actions)(BacklogView);
