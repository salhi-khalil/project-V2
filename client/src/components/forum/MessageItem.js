import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const MessageItem = ({ forum: { _id, text, name, user, date } }) => (
  <Fragment>
    <div className='message'>
      <p className='meta'>
        {name}{' '}
        <span>
          <Moment format='DD/MM/YYYY  h:mm a'>{date}</Moment>
        </span>
      </p>
      <p className='text'>{text}</p>
    </div>
  </Fragment>
);

MessageItem.propTypes = {
  forum: PropTypes.object.isRequired,
};

export default MessageItem;
