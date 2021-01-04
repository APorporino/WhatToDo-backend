import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../actions/index";

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "./Landing";
import Home from "./Home";
import Project from "./project/Project";
import NewProject from "./project/NewProject";
import NewStory from "./project/views/NewStory";
import NewSprint from "./project/views/NewSprint";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.auth);
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/projectPage/:id" component={Project} exact />
        <Route path="/new/project" component={NewProject} exact />
        <Route path="/new/story" component={NewStory} exact />
        <Route path="/new/sprint" component={NewSprint} exact />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth: auth.token };
};

export default connect(mapStateToProps, actions)(App);
