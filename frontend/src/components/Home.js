import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import actions from '../actions/index'
import {getProjects as projectAPI}  from '../api/user'
import ProjectList from './project/ProjectList'
import history from '../history'

class Home extends React.Component {
    state = {projects: []}

    async getProjects (token){
        const projects = await projectAPI(token)
        this.setState({projects})
    }

    componentDidMount () {
        if (this.props.auth){
            this.getProjects(this.props.auth.token)
        }
    }

    

    render() {
        if (!this.props.auth){
            return <Redirect to="/" />
        }
        return (
            <div className="projects">
                <Button bssize="small" type="submit" onClick={() => history.push('/new/project')}>Create New Project</Button>
                <br></br>
                <br></br>
                <h1>Current Projects</h1>
                <hr></hr>
                <br></br>
                <ProjectList projects={this.state.projects} />
            </div>
        )
    }
}

const mapStateToProps = ({auth})=>{
    return {auth}
}

export default connect(mapStateToProps, actions)(Home)