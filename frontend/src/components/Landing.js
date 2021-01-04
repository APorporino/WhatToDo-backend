import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import a from "../images/a.png";
import b from "../images/b.png";
import c from "../images/c.png";
import d from "../images/d.png";

class Landing extends React.Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="center">
        <div className="mainBox">
          <div className="overall">
            <div className="mainText">
              <h1>What To Do</h1>
              <h2>Task manager application for agile software projects</h2>
            </div>
            <div className="secondaryText">
              <p>
                This application allows teams to create shared projects and
                manage user stories and tasks. It offers simple sprint
                management, as well as the assigning and tracking of a task's
                status.
              </p>
            </div>
            <Row>
              <Col xs={6}>
                <Link to={"/login"}>
                  <Button variant="dark" bssize="small">
                    Login
                  </Button>
                </Link>
              </Col>
              <Col xs={6}>
                <Link to={"/signup"}>
                  <Button variant="dark" bssize="small">
                    Signup
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <br></br>

        <Row className="margin">
          <Col className="overall2" lg={6} md={12} xs={12}>
            <h1>See current projects</h1>
            <hr></hr>
            <br></br>
            <img alt="picA" className="pic1" src={a} />
          </Col>
          <Col className="overall2" lg={6} md={12} xs={12}>
            <h1>3 different project views</h1>
            <hr></hr>
            <br></br>
            <img alt="picB" className="pic1" src={b} />
          </Col>
        </Row>

        <Row className="margin">
          <Col className="overall2" lg={6} md={12} xs={12}>
            <h1>Add members from your workspace!</h1>
            <hr></hr>
            <br></br>
            <img alt="picC" className="pic1" src={c} />
          </Col>
          <Col className="overall2" lg={6} md={12} xs={12}>
            <h1>Create stories and tasks</h1>
            <hr></hr>
            <br></br>
            <img alt="picD" className="pic1" src={d} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Landing);
