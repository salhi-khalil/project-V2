import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>;
        
    }

    return (
        <section className="landing-area">
        <div className="dark-overlay">
            <div className="landing-area-inner">
                <h1 className="x-large">Welcome Dear Visitor</h1>
                <p className="guide">Create a doctor or a patient profile, share posts and communicate with other doctors and patients</p>
                <div className="buttons">
                    <Link to="/register" className=" button button-primary">Sign Up</Link>
                    <Link to="/login" className="button button-light">Login</Link>
                </div>
            </div>
        </div>
    </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
