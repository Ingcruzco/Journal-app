import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../actions/notes';

const NotesAppBar = props => {
    const dispatch=useDispatch();
    const {uid}=useSelector(state=>state.auth);
    const {active:note}=useSelector(state=>state.notes);

    const handleClick=()=>{
        dispatch(startSaveNote(uid,note));
    }

    const handlePictureClick=()=>{
        document.getElementById('fileSelector').click();
    }

    const handleFileChange=(e)=>{
         const file=e.target.files[0];
         if(file){
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>22 de Julio de 2021</span> 
            <input 
                type="file"
                id="fileSelector"
                onChange={handleFileChange}
                style={{display:'none'}}
                name="file"
            />
            <div >
            <button 
                className="btn"
                onClick={handlePictureClick}
            >
                Picture
            </button>
            <button
            onClick={handleClick} 
            className="btn"
            >
                Save
            </button>
            </div>      
        </div>
    );
};

export default NotesAppBar;