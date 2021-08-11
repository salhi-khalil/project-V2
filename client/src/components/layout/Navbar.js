import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles/doctor'>Doctors</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/chat'>Chat</Link>
      </li>
      <li>
        <Link to='/forum'>Forum</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
          {''}
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          {''}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to='/profiles/doctor'>List of Doctors</Link>
      </li>
      <li>
        <Link to='/profiles/patient'>List of Patients</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/chat'>Chat</Link>
      </li>
      <li>
        <Link to='/forum'>Forum</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
          {''}
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          {''}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles/doctor'>Doctors</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-user-md'></i> Home
        </Link>
      </h1>
      {!loading && (
        <Fragment> {isAuthenticated && user.role==='admin' ? adminLinks : isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
