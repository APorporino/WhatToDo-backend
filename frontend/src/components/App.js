import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions/index'

import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Landing from './Landing'
import Home from './Home'
import Project from './Project'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser(this.props.auth)
    }

    render() {
        return(
            <BrowserRouter>
                <Header />
                <Route path="/" component={Landing} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/signup" component={Signup} exact/>
                <Route path="/home" component={Home} exact/>
                <Route path="/project/:id" component={Project} exact/>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = ({auth})=>{
    return {auth: auth.token}
}

export default connect(mapStateToProps,actions)(App)