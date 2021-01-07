import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Form, Button, Alert, FormGroup } from "react-bootstrap";
import history from "../../../history";
import { createSprint } from "../../../api/sprint";
import "react-datepicker/dist/react-datepicker.css";

class NewSprint extends React.Component {
  state = { startDate: "", endDate: "" };

  handleSubmit = (event) => {
    createSprint(
      this.props.auth.token,
      this.state.startDate,
      this.state.endDate,
      this.props.project._id
    );
    localStorage.setItem("PreviousView", "SprintView");
    history.push(`/projectPage/${this.props.project.name}`);
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="SmallForm">
        <Form onSubmit={this.handleSubmit} className="form-block">
          <Form.Label style={{ padding: "1vw" }}>Start Date </Form.Label>
          <DatePicker
            id="example-datepicker"
            selected={this.state.startDate}
            onSelect={(e) =>
              this.setState({
                startDate: e,
              })
            }
          />
          <Form.Label style={{ padding: "1vw" }}>End Date </Form.Label>
          <DatePicker
            id="example-datepicker"
            selected={this.state.endDate}
            onSelect={(e) =>
              this.setState({
                endDate: e,
              })
            }
          />
          <Button block bssize="large" style={{ margin: "1vw" }} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, project, error }) => {
  return { auth, project, error };
};
export default connect(mapStateToProps)(NewSprint);
