import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import * as actions from '../actions/index'

class Signup extends React.Component {
    state = {
        firstName: "a",
        lastName: "a",
        email: "sa@gmail.com",
        password: "jdioejodkeodk",
    }

    handleSubmit = (event)=>{
      this.props.signup(this.state.firstName, this.state.firstName, this.state.email, this.state.password)
      event.preventDefault();
    }

    render() {
        if (this.props.auth){
          return <Redirect to="/" />
        }

        return (
            <div className="Signup">
                <Form onSubmit={this.handleSubmit} className="form-block">

                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      type="name" 
                      placeholder="Enter firstName" 
                      value={this.state.firstName}
                      onChange={e => this.setState({firstName: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      type="name" 
                      placeholder=" Enter lastName" 
                      value={this.state.lastName}
                      onChange={e => this.setState({lastName: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email" 
                      value={this.state.email}
                      onChange={e => this.setState({email: e.target.value})}
                    
                    />
                    <Form.Text className="">
                      <i>Username must be unique.</i>
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Enter password" 
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                    />
                  </Form.Group>
                  <Button block bssize="large" type="submit">
                    Submit
                  </Button>
                  <p style={{textAlign: 'center', paddingTop: '10px'}}>{this.props.error}</p>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = ({auth, error})=>{
  return {auth, error}
}

export default connect(mapStateToProps, actions)(Signup)