import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from '../actions/types'

//LOAD USER
export const loadUser = () => async dispatch => {
    
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        const res = await axios.get('/api/auth');
        console.log(res.data)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
} 

//Register User
export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        
      const res = await axios.post('/api/users', body, config) 
     
      dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
      })

      dispatch(loadUser())

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//Login User

export const login = (email, password) => async dispatch => {
  
    try {
        
        const res = await axios.post('/api/auth', {email, password})
        axios.defaults.headers.common['x-auth-token'] = res.data.token
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//////////////Log out

export const logout = () => dispatch => {
    console.log('before', axios.defaults.headers.common['x-auth-token'])
    delete axios.defaults.headers.common['x-auth-token']
    console.log('after', axios.defaults.headers.common['x-auth-token'])
    
    dispatch({ type: LOG_OUT })
}