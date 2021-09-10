import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  startGoogleLogin, startLoginEmailPasword } from '../actions/auth';
import useForm from '../hooks/useForm';

const LoginScreen = () => {
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.ui);
    const [formValues,handleInputChange]= useForm({});

    const {email,password}=formValues;
    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(startLoginEmailPasword(email,password)) 
    }
    const handleGoogleLogin= ()=>{
        dispatch(startGoogleLogin());    
    }
    return (
        <div>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={(e)=>handleLogin(e)}>
                <input 
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}                
                />
                <input 
                    className="auth__input"
                    type="password"
                    placeholder="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}  
                /> 
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login    
                </button> 
                <hr/>
                <div className="auth__social-network">
                    <p>Login with social networks</p>
                </div>
                <div 
                    className="google-btn"
                    onClick={handleGoogleLogin}
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
                <Link 
                    to="/auth/register"
                    className="link"
                    >
                        Create new account
                </Link>
                   
            </form>  
        </div> 
    );
};

export default LoginScreen;