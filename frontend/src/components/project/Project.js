import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/index";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

import MemberView from "./MemberView";
import SprintView from "./SprintView";
import BacklogView from "./BacklogView";

class Project extends React.Component {
  state = { view: "" };

  // constants
  MEMBER_VIEW = "MemberView";
  BACKLOG_VIEW = "BacklogView";
  SPRINT_VIEW = "SprintView";

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
    console.log("here");
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
                      className="button_center"
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
                      See the backlog and add and remove stories.
                    </Card.Text>
                    <Button
                      onClick={() => this.projectSelected(this.BACKLOG_VIEW)}
                      className="button_center"
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
                      See the current and past sprint tasks. Create a new
                      sprint.
                    </Card.Text>
                    <Button
                      onClick={() => this.projectSelected(this.SPRINT_VIEW)}
                      className="button_center"
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
      return <div>Loading../</div>;
    }

    return (
      <div>
        <h1>
          {this.props.project.name}{" "}
          {this.state.view ? `(${this.state.view})` : ""}
        </h1>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error }) => {
  return { auth, project, error };
};

export default connect(mapStateToProps, actions)(Project);
