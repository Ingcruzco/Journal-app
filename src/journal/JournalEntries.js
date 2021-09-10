import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = (props) => {
    const {notes}=useSelector(state=>state.notes);
    // const dispatch=useDispatch();
    // const refNotes=useRef(notes);
    // const [state,setState]=useState(notes)
    // useEffect(()=>{
    //     console.log(notes)
    //     if(refNotes.current.length!== state.length){
    //         console.log('entre al usueffect',refNotes)
    //         setState(notes);
    //         refNotes.current=notes;
    //     }
    // },[notes]);
    return (
        <div className="journal__entries">
            {
                notes.map(value=>(
                    <JournalEntry key={value.id} {...value}/>
                ))
            }     
        </div>
    );
};

export default JournalEntries;