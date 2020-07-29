import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions/index'

import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Landing from './Landing'
import Project from './Project'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return(
            <BrowserRouter>
                <Header />
                <Route path="/" component={Landing} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/signup" component={Signup} exact/>
                <Route path="/projects" component={Project} exact/>
            </BrowserRouter>
        )
    }
}

export default connect(null,actions)(App)