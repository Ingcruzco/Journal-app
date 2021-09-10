import React, {useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, deleteNote } from '../actions/notes';
import useForm from '../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NoteScreen = props => {
    //Ojo el objeto sigue siendo el mismo, ya que State.notes retorna siempre la misma referencia.
    const {active:note}=useSelector(state=>state.notes);
    const dispatch=useDispatch();
    const [formValues, handleInputChange,reset]=useForm(note);
    const {body,title}=formValues; 
    const activeId=useRef(note.id);
    useEffect(()=>{
        if(note.id!==activeId.current){
            reset(note);
            activeId.current=note.id
        }
       
    },[reset,note])

    useEffect(()=>{
        dispatch(activeNote(note.id,{...formValues}))
    },[formValues])

    const handleDeleteNote=()=>{
        dispatch(deleteNote(note.id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar/> 
            <div className="notes__content">
                <input 
                    name="title"
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    
                ></textarea>
                { note.url &&      
                    <div className="notes__image"> 
                        <img 
                        src={note.url}
                        alt="imagen"
                        height="150px"
                        width="150px"
                        />
                    </div>
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={handleDeleteNote}
            >Delete Note</button>
        </div>
    );
};

export default NoteScreen;