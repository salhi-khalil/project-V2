import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import onlineDoctor from '../../img/online-doctor.jpg'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';



const Dashboard = ({ 
    getCurrentProfile, 
    deleteAccount,
    auth: { user,doctor } , 
    profile: { profile, loading },
    
  
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile] );


    
    
    
    console.log('......dashboard doctor: ',localStorage.doctor);
    return loading && profile === null ? (<Spinner />) :
     (<Fragment>
        
        <h1 className='large text-primary'>Dashboard</h1>
        {user.role === 'admin' ?  (
        <p className='guide'>

            <i className='fas fa-user-md text-primary'/> Welcome Admin {user && user.name}
        </p>) : localStorage.doctor === 'true' ?  (
        <p className='guide'>

            <i className='fas fa-user-md text-primary'/> Welcome doctor {user && user.name}
        </p>) : (
            <p className='guide'>

            <i className='fas fa-user text-primary'/> Welcome patient {user && user.name}
        </p>
        )}
       
        { localStorage.doctor === 'true' || user.role === "patient" ? (<Fragment>
        {profile !== null   ? (<Fragment>
         
            <DashboardActions /> 
            <Experience experience= {profile.experience}/>

            <div className="my-2">
                <button className="button button-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-md"> Delete My Account</i>
                </button>
            </div>
            
        </Fragment>) :  
        (<Fragment>
           
            <p>You have not yet setup a profile, please add some information</p>    
                        {user.role === "patient" ? (
                            <Link to='/create-patient-profile' className='button button-primary my-1'>
                                Create Profile
                            </Link>) : (
                            <Link to='/create-profile' className='button button-primary my-1'>
                                Create Profile
                            </Link>
                        )}
            
        </Fragment>
        )} 
         </Fragment>)  : (
             <div>
                <p>You can now chat with your doctor and leave or comment on other post.</p>
                <p>We hope it would be helpful!</p>
                <img
                    src={onlineDoctor}
                    style={{ width: '350px', margin: 'auto', display: 'block' }}
                    alt='Loading...'
        />
             </div>
         )}
    </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount })(Dashboard);
