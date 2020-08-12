import axios from 'axios'
import {FETCH_USER} from './types'
import {ERROR} from './types'

// RECALL: if an arrow function is not followed by a open curly brace,
// it means it is returning the code that follows


// redux-thunk sees we are returning a function and will pass us the dispatch function
export const login = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post('/users/login',{
                email,
                password
        })
        dispatch({type: FETCH_USER, payload: res.data })
    }catch(e){
        dispatch({type: ERROR, payload: "User not found" })
    }
}

export const signup = (firstName, lastName, email, password) => async (dispatch)=> {
    try {
        const res = await axios.post('/newuser', {
            firstName,
            lastName,
            email,
            password
        })
        dispatch({type: FETCH_USER, payload: res.data })
    }catch(e){
        const error = e.response.data.message ? e.response.data.message : "That email is already in use"
        dispatch({type: ERROR, payload: error })
    }
}

export const fetchUser = (access_token) => async (dispatch) => {
    try {
        const res = await axios.get('/currentUser', {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        })
        const payload = {user: {...res.data}, token: access_token}
        dispatch({type: FETCH_USER, payload })
    }catch(e){
        dispatch({type: FETCH_USER, payload: false })
    }
}

export const logout = () => {
    return {type: FETCH_USER, payload: false};
}
