import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../actions/ui';
import { startRegisterWithEmailPasswordName } from '../actions/auth';

const RegisterScreen = () => {

    const {msgError}=useSelector(state=>state.ui)
    const dispatch=useDispatch();

    const [formValues, handleInputChange]=useForm(
        {
            name:'Luis Cruz',
            email:'cruzco2009@hotmail.com',
            password:'1234567',
            password2:'1234567',
        }
    );

    const {name, email, password, password2}=formValues;

    const handleRegister=(e)=>{
        e.preventDefault();
        if(isFormValid()){
            console.log('Formulario Correcto');
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }
    }
    const isFormValid=()=>{
        if(name.trim().length===0){
            dispatch(setError('Name is required'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false;
        }else if(password!==password2 || password.length<5){
            dispatch(setError('Password should be at least 6 characters and match with another password'));
            return false;
        }
        dispatch(removeError());
        return true;
    }
    return (
        <div>
        <h3 className="auth__title">Register</h3>
        <form onSubmit={handleRegister}>

            { msgError && 
                <div className="auth__alert-error">
                    {msgError}
                </div> 
            }
                   
            <input 
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                />
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
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                /> 
                <input 
                    className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                /> 
                
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register    
                </button> 
                
                <Link 
                    to="/auth/register"
                    className="link"
                    >
                        Already Registered?
                </Link>
               
        </form>  
    </div> 
    );
};

export default RegisterScreen;