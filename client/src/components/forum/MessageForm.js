import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/forum';

const MessageForm = ({ addMessage }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <form
        id='chat-form'
        // onSubmit={onSubmit}
      >
        <input
          id='msg'
          type='text'
          placeholder='Enter Message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          autoComplete='off'
        />
        {/* <input type='file' name='file' id='file' onChange={onChange} /> */}

        <button
          className='btn'
          onClick={(e) => {
            e.preventDefault();
            addMessage({
              text,
              // chatRoomId,
              // , file
            });
            // setText('');
            // setFile('');
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
};

export default connect(null, { addMessage })(MessageForm);
