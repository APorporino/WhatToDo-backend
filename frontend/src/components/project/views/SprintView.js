import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewTask from "./NewTask";
import { deleteSprint } from "../../../api/sprint";
import SprintDetail from "./SprintDetail";
class SprintView extends React.Component {
  state = { redirect: false, detail: false, sprint: null, index: null };

  componentDidMount() {
    this.props.getProjectSprints(this.props.auth.token, this.props.project._id);
  }

  deleteSprintFromProject(index) {
    deleteSprint(this.props.auth.token, this.props.sprint[index]._id);
    this.props.getProjectSprints(this.props.auth.token, this.props.project._id);
  }

  renderStories() {
    console.log(this.props.sprint);
    if (this.props.sprint == null) {
      return null;
    }
    return this.props.sprint.map((sprint, index) => {
      return (
        <tr key={index}>
          <td>Sprint {index + 1}</td>
          <td>{sprint.startDate.split("T")[0]}</td>
          <td>{sprint.endDate.split("T")[0]}</td>
          <td>
            <Button
              onClick={() => this.setState({ detail: true, sprint, index })}
              variant="success"
            >
              View
            </Button>
          </td>
          <td>
            <Button
              onClick={() => this.deleteSprintFromProject(index)}
              variant="danger"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  renderView() {
    if (this.state.redirect) {
      return <Redirect to="/new/sprint" />;
    }
    if (this.state.newTask) {
      return <NewTask story={this.state.newTask} />;
    }
    return (
      <div className="center">
        <Container>
          <h3>Sprints</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sprint Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.renderStories()}</tbody>
          </Table>
        </Container>
        <Button
          className="newStoryButton margin"
          variant="success"
          onClick={this.handleClick}
        >
          New Sprint
        </Button>
      </div>
    );
  }

  renderDetail() {
    return (
      <div>
        <SprintDetail sprint={this.state.sprint} index={this.state.index} />
      </div>
    );
  }

  render() {
    if (this.state.detail) {
      return this.renderDetail();
    } else {
      return this.renderView();
    }
  }
}

const mapStateToProps = ({ auth, project, sprint_story, sprint }) => {
  return { auth, project, sprint_story, sprint };
};

export default connect(mapStateToProps, actions)(SprintView);
