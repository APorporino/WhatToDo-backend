import { combineReducers } from 'redux'
import projectReducer from './projectReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'


export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    project: projectReducer
})
