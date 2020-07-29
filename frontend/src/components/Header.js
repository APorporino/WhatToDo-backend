import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav} from 'react-bootstrap'
import * as actions from '../actions/index'

class Header extends React.Component {

    renderRightSide() {
        switch (this.props.auth) {
            case null:
                return <div>Null</div>
            case false:
                return (
                    <Nav className="ml-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="#signup">Signup</Nav.Link>
                    </Nav>
                )

            default: 
                return (
                    <Nav className="ml-auto">
                        <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
                        <Nav.Link href="/">{this.props.auth.user.email}</Nav.Link>
                    </Nav>
                )
        }

    }

    render() {
        return (
            <div>
                <Navbar className="header">
                    <Navbar.Brand href="#home">WhatToDo</Navbar.Brand>
                    
                    {this.renderRightSide()}

                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = ({auth})=>{
    return {auth}
}

export default connect(mapStateToProps, actions)(Header)