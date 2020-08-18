import React from "react";
import { Link } from "react-router-dom";
import { Toast, Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import actions from "../../actions/index";

class ProjectList extends React.Component {
  projectSelected = (index) => {
    //make project reducer hold the project selected
    const project = this.props.projects[index];
    this.props.chooseProject(project);
  };

  loadProject() {
    return this.props.projects.map((project, index) => {
      return (
        <Col md={6} xs={12} key={index}>
          <Link
            to={`projectPage/${project.name}`}
            style={{ textDecoration: "none" }}
          >
            <span onClick={() => this.projectSelected(index)}>
              <Toast className="hover center">
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">{project.name}</strong>
                  <small>{project.createdAt.slice(0, 10)}</small>
                </Toast.Header>
                <Toast.Body>{project.description}</Toast.Body>
              </Toast>
            </span>
          </Link>
        </Col>
      );
    });
  }

  render() {
    if (
      !Array.isArray(this.props.projects) ||
      this.props.projects.length === 0
    ) {
      return <Container>No projects</Container>;
    }

    return (
      <Container>
        <Row>{this.loadProject()}</Row>
      </Container>
    );
  }
}

export default connect(null, actions)(ProjectList);
