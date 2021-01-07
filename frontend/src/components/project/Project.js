import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/index";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

import MemberView from "./views/MemberView";
import SprintView from "./views/SprintView";
import BacklogView from "./views/BacklogView";

class Project extends React.Component {
  state = { view: "" };

  // constants
  MEMBER_VIEW = "MemberView";
  BACKLOG_VIEW = "BacklogView";
  SPRINT_VIEW = "SprintView";

  componentDidMount() {
    const view = localStorage.getItem("PreviousView");
    this.setState({ view });
  }

  projectSelected(view) {
    switch (view) {
      case this.MEMBER_VIEW:
        this.setState({ view: this.MEMBER_VIEW });
        return;

      case this.BACKLOG_VIEW:
        this.setState({ view: this.BACKLOG_VIEW });
        return;

      case this.SPRINT_VIEW:
        this.setState({ view: this.SPRINT_VIEW });
        return;

      default:
        this.setState({ view: "" });
        return;
    }
  }

  // 3 views MemberView, SprintView, BacklogView
  renderContent() {
    switch (this.state.view) {
      case this.SPRINT_VIEW:
        return <SprintView />;
      case this.MEMBER_VIEW:
        return <MemberView />;
      case this.BACKLOG_VIEW:
        return <BacklogView />;
      default:
        return (
          <Container style={{ marginTop: "7%" }}>
            <Row>
              <Col lg={4} md={12}>
                <Card className="card_view">
                  <Card.Body>
                    <Card.Title>Member View</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      See the members of this project. Add and remove members.
                    </Card.Text>
                    <Button
                      onClick={() => this.projectSelected(this.MEMBER_VIEW)}
                      variant="dark"
                    >
                      Go
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={12}>
                <Card className="card_view">
                  <Card.Body>
                    <Card.Title>Backlog View</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      See the backlog and add and remove stories and tasks.
                    </Card.Text>
                    <Button
                      onClick={() => this.projectSelected(this.BACKLOG_VIEW)}
                      variant="dark"
                    >
                      Go
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={12}>
                <Card className="card_view">
                  <Card.Body>
                    <Card.Title>Sprint View</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      Review old and create new sprints. Change task properties.
                    </Card.Text>
                    <Button
                      onClick={() => this.projectSelected(this.SPRINT_VIEW)}
                      variant="dark"
                    >
                      Go
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
  }

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }
    if (!this.props.project) {
      return <div>This project does not exist or you are not a member.</div>;
    }

    return (
      <div>
        <Container className="project_name_header">
          <Row className="justify-content-md-center">
            <Col md={4} xs={4} className="">
              {this.state.view ? (
                <Button
                  variant="light"
                  onClick={() => {
                    localStorage.setItem("PreviousView", "");
                    this.projectSelected("");
                  }}
                >
                  Back
                </Button>
              ) : null}
            </Col>

            <Col md={4} xs={4} className="project_name">
              <h1>{this.props.project.name}</h1>
            </Col>
            <Col md={4} xs={4}></Col>
          </Row>
        </Container>

        <h3 className="project_name">
          {this.state.view ? `(${this.state.view})` : ""}
        </h3>
        <hr></hr>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error }) => {
  return { auth, project, error };
};

export default connect(mapStateToProps, actions)(Project);
