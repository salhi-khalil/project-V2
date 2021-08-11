import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    profession,
    institution,
    locationTown,
    phone,
    address,
    email,
    workTime,
    social,
    contracts,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-image my-1' src={avatar} alt='' />
      <h1 className='large text-dark'>{name}</h1>
      <p className='guide'>
        <strong className='text-dark'>
          {' '}
          <i className='fas fa-user-md text-dark' /> Profession:
        </strong>{' '}
        {profession} {institution && <span> at {institution}</span>}
      </p>
      <p className='m-0-2'>
        <strong className='text-dark'>Location:</strong> {locationTown}
      </p>
      <p className='m-0-2'>
        <strong className='text-dark'>Phone:</strong> {phone}
      </p>
      <p className='m-0-2'>
        <strong className='text-dark'>Email:</strong> {email}
      </p>

      <div className='m-0-2'>
        <strong className='text-dark'>Work time: </strong>
        {workTime.map((workTime, index) => (
          <div key={index} className='p'>
            {workTime}
          </div>
        ))}
      </div>
      <p className='m-0-2'>
        <strong className='text-dark'>Address: </strong>
        {address}
      </p>

      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
