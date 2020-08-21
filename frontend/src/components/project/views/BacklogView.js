import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBacklogStories } from "../../../api/stories";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";

class BacklogView extends React.Component {
  state = { stories: [], redirect: false };

  componentDidMount() {
    this.getStories();
  }

  async getStories() {
    const stories = await getBacklogStories(
      this.props.project.backlog,
      this.props.auth.token
    );
    this.setState({ stories });
  }

  renderStories() {
    return this.state.stories.map((story, index) => {
      return (
        <Row key={index}>
          <Col xs={11}>
            <ListGroup.Item>
              {story.name}:{story.description}
            </ListGroup.Item>
          </Col>
          <Col xs={1}>
            <Button variant="danger">Remove</Button>
          </Col>
        </Row>
      );
    });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      console.log("HERE");
      return <Redirect to="/new/story" />;
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
          className="newStoryButton"
          variant="success"
          onClick={this.handleClick}
        >
          New Story
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project }) => {
  return { auth, project };
};

export default connect(mapStateToProps)(BacklogView);
