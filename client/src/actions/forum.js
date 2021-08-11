import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_FORUM_MESSAGES,
  GET_FORUM_MESSAGE,
  FORUM_MESSAGE_ERROR,
  ADD_FORUM_MESSAGE,
} from './types';

// Get messages
export const getMessages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/forum/forum-room');
    dispatch({
      type: GET_FORUM_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORUM_MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add message
export const addMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/forum/forum-room', formData, config);

    dispatch({
      type: ADD_FORUM_MESSAGE,
      payload: res.data,
    });

    dispatch(setAlert('Message Added', 'success'));
  } catch (err) {
    dispatch({
      type: FORUM_MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get message
export const getMessage = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/forum/forum-room/${id}`);

    dispatch({
      type: GET_FORUM_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORUM_MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
