import {ERROR, CHOSEN_PROJECT} from '../actions/types';

const projectReducer = (state= null, action)=>{
    switch(action.type){
        case CHOSEN_PROJECT:
            return action.payload
        case ERROR:
            return action.payload
        default:
            return state
    }
}

export default projectReducer