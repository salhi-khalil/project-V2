import {
  GET_FORUM_MESSAGES,
  GET_FORUM_MESSAGE,
  FORUM_MESSAGE_ERROR,
  ADD_FORUM_MESSAGE,
} from '../actions/types';

const initialState = {
  messages: [],
  message: null,
  loading: true,
  chatRoomId: null,
  error: {},
  doctor: localStorage.getItem('doctor'),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FORUM_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };
    case GET_FORUM_MESSAGE:
      return {
        ...state,
        message: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    case ADD_FORUM_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    case FORUM_MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    default:
      return state;
  }
}
