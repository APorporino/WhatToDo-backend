import React from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../actions/index'
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";

class Login extends React.Component{
    state = {email: "", password: ""}

    handleSubmit = (event)=>{
        this.props.login(this.state.email, this.state.password)
        event.preventDefault();
    }

    render() {
        if (this.props.auth){
            return <Redirect to="/home" />
        }

        return (
            <div className="Form">
              <form onSubmit={this.handleSubmit} className="form-block">
                <FormGroup controlId="email" bssize="large">
                  <label>Email</label>
                  <FormControl
                    autoFocus
                    type="email"
                    placeholder="Enter email" 
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                  />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                  <label>Password</label>
                  <FormControl
                    value={this.state.password}
                    placeholder="Enter password" 
                    onChange={e => this.setState({password: e.target.value})}
                    type="password"
                  />
                </FormGroup>
                <Button block bssize="large" type="submit">
                  Login
                </Button>
                <div style={{textAlign: 'center', paddingTop: '10px'}}>{this.props.error ? <Alert key={2} variant='danger'>
                {this.props.error}</Alert> : ""}</div>
              </form>
            </div>
          );
    }
    
}

const mapStateToProps = ({auth, error})=>{
    return {auth, error}
}

export default connect(mapStateToProps, actions)(Login)