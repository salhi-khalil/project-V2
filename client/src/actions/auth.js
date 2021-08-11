import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  SEARCH_LOGS,
  SET_ALL_USERS,
  USER_ERROR,
  LOGS_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';

localStorage.getItem('doctor', 'false');


// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth');
    if (res.data.role === "doctor") {
        localStorage.setItem('doctor', true);
    }
    dispatch({
      type: USER_LOADED,
      payload: res.data,
      doctor: localStorage.getItem('doctor')
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      doctor: localStorage.getItem('doctor'),
    });
  }
};

// Register User
export const register = ({ name, email, role, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, role, password });

  try {
    const res = await axios.post('/api/users', body, config);

    // checking if email is from doctor
    if (email.includes('doctors.hr') || email.includes('doctors.com')) {
      console.log('It is a doctor');

      localStorage.setItem('doctor', 'true');
      console.log('...........', localStorage.doctor);
    } else {
      console.log('It is a patient ');

      localStorage.setItem('doctor', 'false');
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
      doctor: localStorage.getItem('doctor'),
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
      doctor: localStorage.getItem('doctor'),
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    // checking if email is from doctor
    if (email.includes('doctors.hr') || email.includes('doctors.com')) {
      console.log('It is a doctor');
      //doctor= true;
      localStorage.setItem('doctor', 'true');
      console.log('...........', localStorage.doctor);
    } else {
      console.log('It is a patient ');
      localStorage.setItem('doctor', 'false');
    }
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      doctor: localStorage.getItem('doctor'),
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
      doctor: localStorage.getItem('doctor'),
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT, doctor: localStorage.setItem('doctor', 'false') });
};

//Get all users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: SET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Search server logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    const res = await fetch(`/api/profiles/?q=${text}`);

    console.log(text);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
    });
  }
};
