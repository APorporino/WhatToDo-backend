import axios from 'axios'
import {FETCH_USER} from './types'

// RECALL: if an arrow function is not followed by a open curly brace,
// it means it is returning the code that follows


// redux-thunk sees we are returning a function and will pass us the dispatch function
export const fetchUser = () => async (dispatch) => {
    try {
        const res = await axios.post('/users/login',{
                email: "porporino@gmail.com",
                password: "Anthony"
            })
        console.log("RESPONSE: " + res.data)
        dispatch({type: FETCH_USER, payload: res.data })
    }catch(e){
        //console.log("e: " + e)
        dispatch({type: FETCH_USER, payload: false })
    }
}

export const logout = () => {
    return {type: FETCH_USER, payload: false};
}
