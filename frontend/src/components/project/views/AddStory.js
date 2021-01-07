import React from "react";
import { connect } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import { addStoryToSprint } from "../../../api/stories";
import actions from "../../../actions/index";

class AddStory extends React.Component {
  componentDidMount() {
    this.props.getBacklogStories(
      this.props.project.backlog,
      this.props.auth.token
    );
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
                <th>Add To Sprint</th>
              </tr>
            </thead>
            <tbody>{this.stories()}</tbody>
          </Table>
        </Container>
      </div>
    );
  }

  addStory(s) {
    addStoryToSprint(this.props.auth.token, this.props.sprint._id, s._id);
    this.props.getBacklogStories(
      this.props.project.backlog,
      this.props.auth.token
    );
    this.props.getSprintTasks(this.props.auth.token, this.props.sprint._id);
  }

  stories() {
    return this.props.story.map((s, index) => {
      return (
        <tr key={index}>
          <td>{s.name}</td>
          <td>{s.description}</td>
          <td>
            {s.sprint ? (
              <div>Already Added</div>
            ) : (
              <Button
                onClick={() => {
                  this.addStory(s);
                }}
                variant="success"
              >
                Add To Sprint
              </Button>
            )}
          </td>
        </tr>
      );
    });
  }
  render() {
    return this.renderStories();
  }
}

const mapStateToProps = ({ auth, story, project }) => {
  return { auth, story, project };
};

export default connect(mapStateToProps, actions)(AddStory);
