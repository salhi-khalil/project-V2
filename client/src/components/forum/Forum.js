import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Forum = ({ auth: { user } }) => {
  return (
    <Fragment>
      <div className='join-container'>
        <header className='join-header'>
          <h1>
            <i className='fas fa-user-md text-dark'></i>{' '}
            <i className='fas fa-heartbeat text-dark'></i> Medical Forum{' '}
            <i className='fas fa-comments text-dark'></i>
          </h1>
        </header>
        <main className='join-main'>
          <form action='forum/forum-room'>
            <div className='form-control'>
              <label>Username</label>
              <h1>{user && user.name}</h1>
            </div>
            <button type='submit' className='btn'>
              <Link to='/forum/forum-room'>Join Forum </Link>
            </button>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  forum: state.forum,
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Forum));
