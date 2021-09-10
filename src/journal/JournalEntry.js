import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote} from '../actions/notes';

const JournalEntry = (notes) => {
    const {title,body,date,id,url}=notes;
    const dispatch= useDispatch();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day=new Date(date);
    const dayOfMonth=day.getUTCDate();
  
    const handleClick=()=>{
        dispatch(activeNote(
            id,
            {
                title,
                body,
                date,
                url,
            },
        ))
    }
    return (
        
            <div className="journal__entry pointer" 
             onClick={handleClick}
            >
            { url &&
                <img className="journal__entry-picture"
                src={url}
                />
            }

            <div className="journal__entry-body">
                
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}        
                </p>
            </div > 
            <div className="journal__entry-date-box">
                <span>{days[day.getDay()]}</span>
                <h4>{dayOfMonth}</h4>
            </div>
        </div>
    );
};

export default JournalEntry;