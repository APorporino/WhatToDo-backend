import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/index";

class MemberView extends React.Component {
  renderMembers() {
    return this.props.project.members.map((member, index) => {
      return <li key={index}>{member}</li>;
    });
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
        <ol>{this.renderMembers()}</ol>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error }) => {
  return { auth, project, error };
};

export default connect(mapStateToProps, actions)(MemberView);
