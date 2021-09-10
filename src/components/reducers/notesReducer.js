import { types } from "../../types/types";

const initialState={
    notes:[],
    active:false,
}

export const notesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case types.notesAddNew:
            return {
               ...state,
                active:{
                    ...action.payload
                }    
            }
        case types.notesLoad:
            return {
                ...state,
                notes:action.payload
            }
        case types.notesUpadate:
            return {
                ...state,
                notes:state.notes.map(
                    note=> note.id===action.payload.id
                        ?action.payload.note
                        :note
                )    
            }
        case types.notesDelete:
            return {
                ...state,
                active:null,
                notes:action.payload,
            }
        case types.notesUpdateArrayNotes:
            return {
                ...state,
                notes:[...state.notes,action.payload],
            }
        default:
            return state;
    }
}

