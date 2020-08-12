import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../actions/index'

class Project extends React.Component {

    componentDidMount() {
        //find the backlog and store in state
        console.log(this.props.project)
        //find the members and admin emails and store in state
    }

    render() {

        if (!this.props.auth){
            return <Redirect to="/" />
        }

        return (
            <div>
                Project {this.props.match.params.id}
            </div>
        )
    }
}

const mapStateToProps = ({auth, project, error})=>{
    return {auth, project, error}
}

export default connect(mapStateToProps, actions)(Project)