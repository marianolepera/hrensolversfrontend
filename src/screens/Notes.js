import Button from '@material-ui/core/Button';
import {React,useEffect,useState, useMemo,useCallback} from 'react';
import { Typography,Grid, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import "../estilos/styles.css";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NotesArray from "../components/NotesArray"
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getNotesbyUserId, reset,setActiveNote} from '../reducers/notesSlice'
import ModalCreateEdit from '../components/ModalCreateEdit';
import Spinner from "../components/Spinner"




const WIDTH_TAREA = 700;
const useStyles = makeStyles(theme => ({
    container: {
      borderRadius: theme.spacing(),
      marginRight: 24,
      width: WIDTH_TAREA,
      height: '100%',
      minHeight: 100,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width:WIDTH_TAREA
    },
  }));
function Notes() {

    const [open, setOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('Todos');

    const handleChangeCategory = (event) => {
      setFilterCategory(event.target.value);
    };

    const classes = useStyles();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      dispatch(setActiveNote(null))
    };

   
    const history = useHistory()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { notes, isLoading, isError, message } = useSelector(
      (state) => state.notes
    )
    let categories=[]
    let notesNoArchives=notes.filter((nota => nota.archive == false))
    notesNoArchives.map(not =>
      not.category.map(cat =>
        categories.push(cat)
      )
    )
 
    notesNoArchives= notesNoArchives.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
    useEffect(() => {
      if (isError) {
        console.log(message)
      }
  
      if (!user) {
        history.push('/login')
      }
      dispatch(getNotesbyUserId())
  
      return () => {
        dispatch(reset())
      }
    }, [user, history, isError, message, dispatch])

    if (isLoading) {
      return <Spinner />
    }
  
   
    return(
        <>
            <Header></Header>
            <div style={{margin:30}}>
                <div style={{display:"flex",width:"34%",justifyContent:"space-between"}}>
                <Typography variant="h4"> MY NOTES</Typography>
                <Button   onClick={handleClickOpen} variant="outlined"> Create Note</Button>
                <ModalCreateEdit
                    open={open}
                    handleClose={handleClose}
                />
                <Link to="/archivos">
                    <Typography style={{marginTop:7}}> Archived notes</Typography>
                </Link>
                
                </div>
                <Grid container  xs={5}>
                    <Grid item xs={3}>
                        <Typography style={{marginTop:10}}>Category Filter</Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={filterCategory}
                        onChange={handleChangeCategory}
                        style={{width:150,height:30}}
                        >
                          <MenuItem value="Todos">Todos</MenuItem>
                          {categories.map(cat =>(
                              <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
                          ))}
                        
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
              
                {notesNoArchives.map(note =>{
                      if( filterCategory == "Todos" || note.category.some(category=> category.name ==filterCategory)){
                        return (
                          <NotesArray note={note}/>
                        )
                      } 
                      
                }
                )}  
                
            </div>  
        </>
        
    )
}

export default Notes