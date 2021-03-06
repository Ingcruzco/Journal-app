import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch,Redirect} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import JournalScreen from '../journal/JournalScreen';
import {firebase} from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../actions/notes';

const AppRouter = () => {
    const dispatch=useDispatch();
    const [checking,setChecking]=useState(true);
    const [isLoggedIn,setIsLoggedIn]=useState(false)


    useEffect(()=>{
        firebase.auth().onAuthStateChanged(async (user)=>{
    
            if (user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedIn(true);
                const notes= await loadNotes(user.uid);
                dispatch(setNotes(notes))
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        })
    },[dispatch,setIsLoggedIn,setChecking])

    if(checking){
        return(
            <h1>Espere por favor...</h1>
        );
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuthenticated={isLoggedIn}
                        path='/auth' 
                        component={AuthRouter}
                    />
                    <PrivateRoute exact 
                        isAuthenticated={isLoggedIn}
                        path='/' 
                        component={JournalScreen}
                    />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;