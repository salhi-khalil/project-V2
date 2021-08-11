import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import chat from './chat';
import forum from './forum';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  chat,
  forum,
});
