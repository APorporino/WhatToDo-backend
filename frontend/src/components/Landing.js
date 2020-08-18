import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Landing extends React.Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/home" />;
    }

    return <div>Landing</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Landing);
