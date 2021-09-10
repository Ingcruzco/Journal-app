import { types } from "../types/types";
import {firebase, googleAppProvider} from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
export const startLoginEmailPasword=(email,password)=>{
    return (dispatch)=>{
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) =>{
                dispatch(
                    login(user.uid,user.displayName)
                );
                dispatch(finishLoading());
            })
            .catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                  })
            })
    }
}

export const startGoogleLogin=()=>{
    return  (dispatch)=>{
        firebase.auth().signInWithPopup(googleAppProvider)
            .then(({user})=>{ 
                dispatch(
                    login(user.uid,user.displayName) 
                ); 
            })
    }
}

export const startRegisterWithEmailPasswordName=(email, password,name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async ({user})=> {
                await user.updateProfile({displayName:name})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

export const login=(uid,displayName)=>{
    return{
        type:types.login,
        payload:{
            uid,
            displayName,    
        }
    }
}

export const logout=()=>({
    type:types.logout
})

export const startLogout=()=>{
    return async (dispatch)=>{
        await firebase.auth().signOut()
            .then(()=>{
                dispatch(logout())
            })
            .catch(err=>console.log(err))
    }
}
