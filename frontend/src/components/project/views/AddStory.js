import React from "react";
import { connect } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import { addStoryToSprint } from "../../../api/stories";

class AddStory extends React.Component {
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
  }

  stories() {
    return this.props.story.map((s, index) => {
      console.log("H");
      console.log(this.props.sprint._id);
      console.log("H");
      console.log(s._id);
      console.log("H");
      return (
        <tr key={index}>
          <td>{s.name}</td>
          <td>{s.description}</td>
          <td>
            {this.props.sprint._id === s._id ? (
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

const mapStateToProps = ({ auth, story }) => {
  return { auth, story };
};

export default connect(mapStateToProps)(AddStory);
