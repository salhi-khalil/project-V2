import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({
  createProfile,
  //getCurrentProfile,
  //profile,
  history,
}) => {
  const [formData, setFormData] = useState({
    locationTown: '',   
    phone: '',
    address: '',
    email: '',
    bio: '',
    
  });



  const {
    
    
    institution,
   
    
    phone,
    address,
    email,
    bio,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  /*useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);*/
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='guide'>
        <i className='fas fa-user-md text-primary'></i>
        Let's get some information dear Patient
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
         
          <small className='form-text'>
            Give us your full Name please
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Full Name'
            name='institution'
            value={institution}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Your Phone
          </small>
        </div>
     
         
         
        <div className='form-group'>
          <input
            type='tel'
            placeholder='* Phone'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
            pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}'
          />
        </div>
       
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Address'
            name='address'
            value={address}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Put your adress
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Write your login email</small>
        </div>
        
        <div className='form-group'>
          <textarea
            placeholder='illness description'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us about your illness</small>
        </div>

       

        <input type='submit' className='button button-primary my-1' />
        <Link className='button button-light my-1' to='/dashboard.html'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));