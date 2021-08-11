import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  SEARCH_LOGS,
  LOGS_ERROR,
  USER_ERROR,
  SET_ALL_USERS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  doctor: localStorage.getItem('doctor'),
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_LOGS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        doctor: localStorage.getItem('doctor')
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: payload,
        doctor: localStorage.getItem('doctor'),
      };
    case SET_ALL_USERS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        doctor: localStorage.getItem('doctor'),
        users: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
    case USER_ERROR:
    case LOGS_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    default:
      return state;
  }
}
