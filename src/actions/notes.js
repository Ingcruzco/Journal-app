import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";



export const startNewNote=()=>{
    
    return async  (dispatch,getState)=>{
        const uid=getState().auth.uid;
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }  

        const doc= await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id,newNote));
    }
}

export const activeNote=(id,note)=>({
    
    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const setNotes=  (notes)=>{
    return {
        type:types.notesLoad,
        payload:notes,
    }
}

export const activeNotes=()=>({
    type:types.notesActive,
    payload:true      
})
      
export const startSaveNote= (uid,notes,msg='Your note has been saved')=>{
    return async (dispatch)=>{
        if(!notes.url){
            delete notes.url;
        }
        await db.doc(`${uid}/journal/notes/${notes.id}`).update(notes);
        dispatch(refreshNote(notes.id,notes));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1000
          })
    }
}

export const refreshNote=(id, note)=>({
    type:types.notesUpadate,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
})

export const startUploading=(file)=>{
    return async (dispatch,getState)=>{
        const {active:activeNote}=getState().notes;
        const {uid}=getState().auth;
        Swal.fire({
            title:'Uploading...',
            text:'Please Wait',
            allowOutsideClick:false,
            onBeforeOpen:()=>{
                Swal.showLoading();}
            }); 
        
        const fileUrl=await fileUpload(file);
        activeNote.url=fileUrl;
        dispatch(startSaveNote(uid,activeNote,'The image has been uploaded'));
        Swal.close();
    }
}

export const deleteNote=(id)=>{
    return async (dispatch,getState)=>{
        const {uid}=getState().auth;
        const notes=getState().notes.notes.filter(note=>note.id!==id)
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(updateNoteDeleted(notes))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your note has been deleted',
            showConfirmButton: false,
            timer: 1000
          })
    }
}

export const updateNoteDeleted=(notes)=>({
    type:types.notesDelete,
    payload:notes,
})

export const updateArrayNotes=(id,notes)=>({
    type:types.notesUpdateArrayNotes,
    payload:{
        id,
        notes
    },
})