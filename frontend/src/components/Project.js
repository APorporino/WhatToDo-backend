import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class Project extends React.Component {

    render() {

        if (!this.props.auth){
            return <Redirect to="/" />
        }


        console.log(this.props)
        return (
            <div>
                Project {this.props.match.params.id}
            </div>
        )
    }
}

const mapStateToProps = ({auth, error})=>{
    return {auth, error}
}

export default connect(mapStateToProps, actions)(Project)