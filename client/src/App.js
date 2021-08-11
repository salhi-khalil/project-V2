import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import createPatientProfile from './components/profile-form/create-patient-profile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Chat from './components/chat/Chat';
import ChatRoom from './components/chat/ChatRoom';
import Forum from './components/forum/Forum';
import ForumRoom from './components/forum/ForumRoom';
import PrivateRoute from './components/routing/PrivateRoute';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

/*if(localStorage.token) {
  setAuthToken(localStorage.token);
}*/
const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/profiles/:role?' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
               <PrivateRoute
                exact
                path='/create-patient-profile'
                component={createPatientProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute exact path='/chat' component={Chat} />
              <PrivateRoute exact path='/chat/chat-room' component={ChatRoom} />
              <PrivateRoute exact path='/forum' component={Forum} />
              <PrivateRoute
                exact
                path='/forum/forum-room'
                component={ForumRoom}
              />
            </Switch>
          </section>
        </Fragment>
      

      </Router>
    </Provider>
  );
};

export default App;
