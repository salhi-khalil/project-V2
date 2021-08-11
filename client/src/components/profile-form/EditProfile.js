import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
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
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    /*getCurrentProfile();

        setFormData({
            profession: loading || !profile.profession ? '' : profile.profession,
            locationTown: loading || !profile.locationTown ? '' : profile.locationTown,
            institution: loading || !profile.institution ? '' : profile.institution,
            contracts: loading || !profile.contracts ? '' : profile.contracts.join(','),
            workTime: loading || !profile.workTime ? '' : profile.workTime.join(','),
            phone: loading || !profile.phone ? '' : profile.phone,
            address: loading || !profile.address ? '' : profile.address,
            bio: loading || !profile.bio ? '' : profile.bio,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
        
    },[loading]);*/

    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

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
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='guide'>
        <i className='fas fa-user-md text-primary'></i>
        Let's get some information to make your profile
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <select name='profession' value={profession} onChange={onChange}>
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
            onChange={onChange}
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
            onChange={onChange}
          />
          <small className='form-text'>
            City and state suggested (example: Manzeh 5, GOMYCODE )
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Contracts with:'
            name='contracts'
            value={contracts}
            onChange={onChange}
          />
          <small className='form-text'>
            Please use comma separated values (example.: GOMYCODE,manzeh 5,Tunisia)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='tel'
            placeholder='* Phone'
            name='phone'
            value={phone}
            onChange={onChange}
            pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}'
          />
          <small className='form-text'>
            Include international dialing code (example. 216-98-176-988 )
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Address'
            name='address'
            value={address}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />
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
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='button button-primary my-1' />
        <Link className='button button-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
