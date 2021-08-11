import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Chat = ({ auth: { user } }) => {
  return (
    <Fragment>
      <div className='join-container'>
        <header className='join-header'>
          <h1>
            <i className='fas fa-user-md text-dark'></i>{' '}
            <i className='fas fa-heartbeat text-dark'></i> Medical Chat{' '}
            <i className='fas fa-comments text-dark'></i>
          </h1>
        </header>
        <main className='join-main'>
          <form action='chat/chat-room'>
            <div className='form-control'>
              <label>Username</label>
              <h1>{user && user.name}</h1>
            </div>
            {/* <div className="form-control">
                    <label >Room</label>
                    <select name="room" id="room" value={room} onChange={onChange}>
                    { localStorage.doctor === 'true' ? (
                        <Fragment>
                        <option value="Doctors">Doctors</option> 
                        <option value="Doctor-Patient">Doctor-Patient</option>
                        </Fragment>) : (
                        <Fragment>
                        <option value="Patients">Patients</option>
                        <option value="Doctor-Patient">Doctor-Patient</option>
                        </Fragment>)
                    
                    }
                    </select>
                </div> */}
            <button type='submit' className='btn'>
              <Link to='/chat/chat-room'>Join Chat </Link>
            </button>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Chat));
