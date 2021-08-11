import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        password2: ''
    });


    const { name, email, role, password, password2} = formData;

    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match','danger');
        } else  {
            register({ name, email, role, password });
        }
       
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>;
    }
    return (
    <Fragment>
    <div className="user">
    <div className="top">
        <h1 className="large text-primary">
            Sign Up
        </h1>
        
        <p className="guide"><i className="fas fa-user"></i>
            Create your account
        </p></div>
        <div className="credentials">
        <form className="form" onSubmit={e => onSubmit(e)} >
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name"
                    name='name' 
                    value={name}
                    onChange={e => onChange(e)}
                    //required
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address"
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    //required
                />
            </div>
            <div className="form-group">
                <select name="role" onChange={e => onChange(e)}>
                    <option>-- Please choose --</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="medical representative">Medical representative</option>
                    <option value="supplier">Supplier</option>
                </select>
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Password" 
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    //minLength="8"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name='password2'
                    value={password2}
                    onChange={e => onChange(e)}
                    //minLength="8"
                />
            </div>
            <input type="submit" value="Register" className="button button-primary"/>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </form>
    </div>
    </div>
    </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
