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
    profession: '',
    locationTown: '',
    institution: '',
    contracts: '',
    workTime: '',
    phone: '',
    address: '',
    email: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    profession,
    locationTown,
    institution,
    contracts,
    workTime,
    phone,
    address,
    email,
    bio,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
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
        Let's get some information to make your profile
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='profession'
            value={profession}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Dentist'>Dentist</option>
            <option value='Dermatologist'>Dermatologist</option>
            <option value='Gynecologist'>Gynecologist</option>
            <option value='Ophthalmologist'>Ophthalmologist</option>
            <option value='Orthodontist'>Orthodontist</option>
            <option value='Pediatrician'>Pediatrician</option>
            <option value='Physiatrist'>Physiatrist</option>
            <option value='Plastic surgent'>Plastic surgent</option>
            <option value='Radiologist'>Radiologist</option>
            <option value='Surgent'>Surgent</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Institution'
            name='institution'
            value={institution}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own institution or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Location'
            name='locationTown'
            value={locationTown}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City and state suggested (eg. Split, CRO)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Contracts with:'
            name='contracts'
            value={contracts}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (example: Manzeh, Tunis, Tunisia))
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
        <small className='form-text'>
          Include international dialing code (example. 216-98-176-988 )
        </small>
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
          <input
            type='text'
            placeholder='* Work time:'
            name='workTime'
            value={workTime}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (example: from 8 to 12, from 14-18)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='button button-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

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
