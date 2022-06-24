import {React,useEffect,useState} from 'react';
import { Typography,Grid,IconButton } from '@material-ui/core';
import "../estilos/styles.css";
import ArchiveIcon from '@material-ui/icons/Archive';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { deleteNote,updateNote,updateArchiveToTrueOrFalse,reset,setActiveNote } from '../reducers/notesSlice';
import { useSelector, useDispatch } from 'react-redux'
import ModalCreateEdit from './ModalCreateEdit';
import Swal from 'sweetalert2';
import Spinner from "../components/Spinner"
import moment from 'moment';

export default function NotesArray ({note}) {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {  isLoading, isError,isSuccess, message } = useSelector(
      (state) => state.notes
    )



    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      dispatch(setActiveNote(note))
    };
  
    const handleClose = () => {
      setOpen(false);
      dispatch(setActiveNote(null))
    };

    const archiveNote = (noteId) =>{
        try {
            dispatch(updateArchiveToTrueOrFalse(noteId))
            
        } catch (error) {
          console.log(error)
        }
     }

  
     const deleteNoteByNoteId = (noteId) =>{
      try {
        dispatch(deleteNote(noteId))
      } catch (error) {
    
      }
    }

    if (isLoading) {
        return <Spinner />
      }

    return (
        
        <div className="notes-container">
            <Grid container >
                <Grid item xs={2}>
                    <div className='background'> </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <Typography style={{fontWeight:"bold"}}>{note.title}</Typography>   
                        <Typography>Last edited: {moment(note.updatedAt).format("DD/MM/YYYY")}</Typography>   
                    </div>
                </Grid>
                <Grid item  xs={4}>
                    {note.archive ==true ? 
                        <IconButton
                            onClick = {()=> archiveNote(note._id)}
                        >
                            <UnarchiveIcon fontSize='large'></UnarchiveIcon>
                        </IconButton>   
                    :
                        <IconButton
                            onClick = {()=> archiveNote(note._id) }
                        >
                             <ArchiveIcon fontSize='large'></ArchiveIcon>
                        </IconButton>
                     }
                    <IconButton
                            onClick = {()=> handleClickOpen() }
                        >
                            
                        <CreateIcon fontSize='large'></CreateIcon>
                    </IconButton>
                    <ModalCreateEdit
                        open={open}
                        note={note}
                        handleClose={handleClose}
                        />
                    
                    <IconButton
                            onClick = {()=> deleteNoteByNoteId(note._id) }
                        >
                        <DeleteIcon fontSize='large'></DeleteIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
    

}