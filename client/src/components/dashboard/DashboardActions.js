import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
      <div className='dash-buttons'>
            <Link to='/edit-profile' className='button'>
             <i className='fas fa-user-circle text-primary' /> Edit Profile
            </Link >
            <Link  to='/add-experience' className='button'>
                <i className='fab fa-black-tie text-primary' />  Add Experience
            </Link >
        </div>
 
    );
};

export default DashboardActions;

