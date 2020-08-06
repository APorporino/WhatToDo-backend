import { FETCH_USER } from '../actions/types'

const authReducer = (state = false, action) => {
    switch(action.type) {
        case FETCH_USER:
            // recall an empty string is false in JS
            return action.payload || false;
        default:
            return state;
    }
}

export default authReducer