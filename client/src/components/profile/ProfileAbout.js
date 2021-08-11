import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: {
    bio,
    contracts,
    user: { name }
}


}) =>   
        <div className="profile-about bg-light p-2">
                { bio && (
                    <Fragment>
                        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                        <p>{ bio}</p> 
                        <div className="line"></div>
                    </Fragment>
                )}
               
               
                <h3 className="text-primary p-1">Contracts with:</h3>
                <div className="contract">
                    {contracts.map((contracts,index) => (
                        <div key={index} className="p">
                            <i className="fas fa-check"></i>{contracts}
                        </div>
                    ))}
                        
                </div>
            </div> 

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
