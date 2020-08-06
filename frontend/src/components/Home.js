import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button, Toast, Container, Row, Col} from 'react-bootstrap'
import * as actions from '../actions/index'
import {getProjects as projectAPI}  from '../api/user'

class Home extends React.Component {

    getProjects(token){
        console.log(projectAPI)
    }

    renderProjects() {

        //call getProjects for the current user
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6} xs={12}>
                            <Toast onClick={()=> console.log("j")} className="hover center">
                                <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                <strong className="mr-auto">WhatToDo</strong>
                                <small>just now</small>
                                </Toast.Header>
                                <Toast.Body>See? Just like this.</Toast.Body>
                            </Toast>
                        </Col>
                        <Col md={6} xs={12}>
                        <Toast className="hover center">
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">WhoWon</strong>
                            <small>2 seconds ago</small>
                            </Toast.Header>
                            <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
                        </Toast>
                        </Col>
                    </Row>
                </Container>
            </div>
        )            
    }

    render() {

        if (!this.props.auth){
            console.log("REDIRECT")
            return <Redirect to="/" />
        }

        return (
            <div className="projects">
                <Button bssize="small" type="submit" onClick={() => this.getProjects(`${this.props.auth.token}`)}>Create New Project</Button>
                <br></br>
                <br></br>
                <h1>Current Projects</h1>
                <hr></hr>
                <br></br>
                {this.renderProjects()}
            </div>
        )
    }
}

const mapStateToProps = ({auth})=>{
    return {auth}
}

export default connect(mapStateToProps, actions)(Home)