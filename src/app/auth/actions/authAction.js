import axios from 'axios';
import { returnErrors } from '../../common/actions/errorAction';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from '../../common/actions/types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get('auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_FAIL'));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().rootReducer.auth.token;
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

// Register User
export const register = ({ firstName, lastName, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ firstName, lastName, email, password });

  axios
    .post('/auth/signup', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
