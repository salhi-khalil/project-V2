import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMessages, addEmail } from '../../actions/chat';
import { getUsers } from '../../actions/auth';

import MessageItem from './MessageItem';
import MessageForm from './MessageForm';

const ChatRoom = ({
  getMessages,
  getUsers,
  addEmail,
  auth: { user, users },
  chat: { _id, text, name, messages, chatRoomId, clickedEmail, loading },
}) => {
  // const [clickedUsersEmail, setClickedEmail] = useState('');

  // console.log(clickedUsersEmail);

  useEffect(() => {
    getMessages();
    getUsers();
  }, [getMessages, getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='chat-container'>
        <header className='chat-header'>
          <h1>
            <i className='fas fa-user-md text-dark'></i>{' '}
            <i className='fas fa-heartbeat text-dark'></i> MedicalChat{' '}
          </h1>
          {/* <h3> ChatRoom {messages[0].chatRoomId}</h3> */}
          <button type='submit' className='btn'>
            <Link to='/chat'> Leave Room</Link>
          </button>
        </header>
        <main className='chat-main'>
          <div className='chat-sidebar'>
            <h3> Welcome {user && user.name} </h3>

            <h3>
              <i className='fas fa-users text-primary'></i> Users
            </h3>

            {/* `     <ul id='users'>
              <li>{allUsers}</li>
            </ul>` */}
            <ul id='users'>
              {users.map((user) => {
                return (
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      // alert(user.email)
                      // setClickedEmail(user.email),
                      addEmail({
                        clickedEmail: user.email,
                      });
                    }}
                  >
                    {user.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='chat-messages'>
            {messages.map((chat) => (
              <MessageItem key={chat._id} chat={chat} />
            ))}
          </div>
        </main>
        <div className='chat-form-container'>
          <MessageForm />
        </div>
      </div>
    </Fragment>
  );
};

ChatRoom.propTypes = {
  getMessages: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  addEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  users: state.auth.users,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getMessages,
  getUsers,
  addEmail,
})(ChatRoom);
