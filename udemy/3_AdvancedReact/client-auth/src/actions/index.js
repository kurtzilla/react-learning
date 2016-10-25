import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
  return function(dispatch) {
    // Submit email/pass to API server
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    // TODO formulate proper error messages returned from server
    // see side notes in video - axios has a bug - returns its own object
    .catch(error => dispatch(authError(error.response.data.error)));
    //.catch(response => console.log(response, response.message) );
    // .catch(function(err) {
    //   console.log('Error', err);
    //   console.log('Error', err.message);
    // });
  }
}

// redux thunk allows us to dispatch multiple actions inside an actionCreator
export function signinUser ({ email, password }) {
  return function(dispatch) {
    // Submit email/pass to API server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      // if request is valid...
      // - Update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      // - Save Jwt token to localStorage
      localStorage.setItem('token', response.data.token);
      // - Redirect to 'feature'
      browserHistory.push('/feature');
    })
    .catch(() => {
      // If request is bad
      // - Show error
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token' )}
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}
