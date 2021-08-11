import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage, getMessages, getEmail } from '../../actions/chat';

const MessageForm = ({
  addMessage,
  getMessages,
  getEmail,
  auth: { user },
  chat: { chatRoomId, clickedEmail },
}) => {
  const [text, setText] = useState('');
  // const [chatRoomId, setChatRoomId] = useState('');
  const myEmail = user.email;
  let otherEmail = user.email;
  if (clickedEmail.clickedEmail !== null) {
    otherEmail = clickedEmail.clickedEmail;
  }
  const sortedMails = [myEmail, otherEmail].sort((a, b) => a.localeCompare(b));
  const newChatroomId = sortedMails[0] + '/' + sortedMails[1];

  console.log(newChatroomId);
  console.log(clickedEmail.clickedEmail);

  useEffect(() => {
    getMessages(newChatroomId);
    getEmail();
  }, [getMessages, newChatroomId, getEmail]);

  return (
    <Fragment>
      <h5> ChatRoom: {newChatroomId}</h5>
      <form id='chat-form'>
        <input
          id='msg'
          type='text'
          placeholder='Enter Message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          autoComplete='off'
        />
        <button
          className='btn'
          onClick={(e) => {
            e.preventDefault();
            addMessage({
              text,
              chatRoomId: newChatroomId,
            });
            setText(' ');
          }}
        >
          <i className='fas fa-paper-plane'></i> Send
        </button>
      </form>
    </Fragment>
  );
};
MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage, getMessages, getEmail })(
  MessageForm
);
