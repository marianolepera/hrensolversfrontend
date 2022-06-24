import Button from '@material-ui/core/Button';
import {React,useEffect,useState, useCallback} from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NotesArray from '../components/NotesArray';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../components/Spinner"
import moment from 'moment';
import { getNotes, getNotesbyUserId,updateArchiveToTrueOrFalse,reset } from '../reducers/notesSlice'
import { useHistory } from 'react-router-dom';

function Archives() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const { notes, isLoading, isError, message } = useSelector(
        (state) => state.notes
      )
      useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        if (!user) {
          history.push('/login')
        }
    
        //dispatch(getNotes())
        dispatch(getNotesbyUserId())
    
        return () => {
          dispatch(reset())
        }
      }, [user, history, isError, message, dispatch])
  
      if (isLoading) {
        return <Spinner />
      }

   

    let notesArchives=notes.filter((nota => nota.archive == true))
   console.log("notes sin archivar",notesArchives)
    return(
        <>
            <Header></Header>
            <div style={{margin:30}}>
                <div style={{display:"flex",width:"40%",justifyContent:"space-between"}}>
                <Typography variant="h4"> ARCHIVED NOTES</Typography>
                <Link to="/">
                    <Typography style={{marginTop:7}}> Go back to unarchived Notes</Typography>
                </Link>
                
                </div>
                {notesArchives.map(note =>(
                  <NotesArray 
                  note={note}/>
                ))} 
            </div> 
        
        </>
        
    )
}

export default Archives