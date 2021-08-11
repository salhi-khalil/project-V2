import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { adminDeleteAccount } from '../../actions/profile'

const ProfileItem = ({
  adminDeleteAccount,
  profile: {
    user: { _id, name, avatar },
    profession,
    institution,
    locationTown,
    contracts,
    email,
  },
  auth,
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} className='round-image' alt='' />
      <div>
        <h2>{name}</h2>

        <p>
          {profession} {institution && <span> at {institution} </span>}
        </p>

        <p>
          <i className='fas fa-envelope text-primary'></i> {email}
        </p>
        <p className='my-1'>{locationTown && <span>{locationTown}</span>}</p>
        <Link to={`/profile/${_id}`} className='button button-primary'>
          View Profile
        </Link>
        {auth && auth.user.role === "admin" ? ( 
        <div className="my-2">
                <button className="button button-danger" onClick={() => adminDeleteAccount(_id)}>
                    <i className="fas fa-user-md"> Delete Account</i>
                </button>
        </div>
        ) : ''}
    
        </div>
      <ul>
        {contracts.slice(0, 4).map((contracts, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i>
            {contracts}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  adminDeleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {adminDeleteAccount})(ProfileItem);
