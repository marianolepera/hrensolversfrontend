import React, { useState, useContext, useEffect } from 'react';
import Modal from '@material-ui/core/Modal'
import "../estilos/styles.css"
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Fade from '@material-ui/core/Fade';
import { Typography,Grid,TextField,Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createNote,updateNote,setActiveNote,reset } from '../reducers/notesSlice';

const WIDTH_TAREA = 800;

const useStyles = makeStyles(theme => ({

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
        width:WIDTH_TAREA,
    },
   
  }));

export default function ModalCreateEdit (props) {
    const classes = useStyles();
    const { notes, isLoading, isError, message,activeNote } = useSelector(
        (state) => state.notes
      )
    const history = useHistory()
    const dispatch = useDispatch()
    const [tagName, setTagName] = useState('')
    // const [tags, setTags] = useState([props.note?.category ? props.note?.category  : []]);
    const [tags, setTags] = useState([]);
    const [tagsUpdated, setTagsUpdated] = useState(props.note ? props.note  : {});
    //const [tagsUpdated, setTagsUpdated] = useState(activeNote ? activeNote : {});

    const [title, setTitle] = useState(props.note?.title ? props.note?.title  : '')
    const [content, setContent] = useState(props.note?.content ? props.note?.content  : '')
    
    
    const removeTag= (index) =>{
        if(props.note){
            setTagsUpdated(tagsUpdated.category.filter((el, i) => i !== index))
        }else{
            setTags(tags.filter((el, i) => i !== index))
        }
        
    }
    //console.log("active",activeNote)

    const addTag =(e) =>{

        if(props.note){
            if (tagName.trim()){
                let newTag={
                    name:tagName
                }
        
                setTagsUpdated([...tagsUpdated.category, newTag])
                setTagName("")
            }
            else{
                alert("esta vacio")
            }
        }else{
            if (tagName.trim()){
                let newTag={
                    name:tagName
                }
        
                setTags([...tags, newTag])
                setTagName("")
            }
            else{
                alert("no se puede ingresar vacio")
            }
        }
        

    }


    const handleChangeTag =(e)=>{
        setTagName(e.target.value)
    }
    const onSubmit = (e,tags) => {
        e.preventDefault()
        const noteData = {
            title,
            content,
            category:tags

          }
          if (props.note){
            try {
                dispatch(updateNote( noteData,activeNote._id))
                dispatch(setActiveNote(null))
                dispatch(reset())
            } catch (error) {
                console.log(error)
            }
            
          }else{
            dispatch(createNote( noteData ))
            dispatch(reset())
          }
    
       
      }

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={props.open}>
            <div className={classes.paper}>
                <h1 id="transition-modal-title">CREATE/EDIT NOTE</h1>
                <Grid container>
                    <form onSubmit={(e) => onSubmit(e,tags)}>
                        <Grid item  xs={2} sm={2}>
                            <Typography style={{marginTop:12}}> Title</Typography>
                        </Grid>
                        <Grid item xs={10} sm={10}>
                            <TextField
                                style={{width:500}}
                                placeholder = ""
                                value={title}
                                //defaultValue={props.note?.title ? props.note?.title  : title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant = "outlined"/>
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={2}>
                            <Typography> Content</Typography>
                        </Grid>
                        <Grid item style={{marginTop:20}} xs={10}>
                            <TextField
                                multiline={true}
                                rows={3}
                                style={{width:500}}
                                //defaultValue={props.note?.content ? props.note?.content  : content}
                                value={content}
                                placeholder = ""
                                onChange={(e) => setContent(e.target.value)}
                                variant = "outlined"/>
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={2}>
                            <Typography > Categories</Typography>
                        </Grid>
                      
                            {/* <Grid item xs={10}>
                                <div className="tags-input-container">
                                { tags.map((tag, index) => (
                                    <div className="tag-item" key={index}>
                                        <span value={tag.name} className="text"> {tag.name}</span>
                                        <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                    </div>
                                    )) }
                                </div>
                            </Grid> */}
                            
                        {props.note ? 
                            <Grid item xs={10}>
                                <div className="tags-input-container">
                                {console.log("tags",tagsUpdated)}
                                { tagsUpdated.category?.map((tag, index) => (
                                    <div className="tag-item" key={index}>
                                            {console.log("name",tag.name)}
                                            <span  className="text">{tag.name}</span>
                                            <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                       
                                    </div>
                                     )) }
                                </div>
                            </Grid>
                        :
                            <>
                            { tags.map((tag, index) => (
                            <Grid item xs={10}>
                                <div className="tags-input-container">
                                    <div className="tag-item" key={index}>
                                        <span className="text">{tag.name}</span>
                                        <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                    </div>
                                </div>
                            </Grid>
                            )) }
                            </>
                        }
                        
                        <Grid style={{marginTop:20}} item xs={2}>
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={8}>
                            <TextField  name="name" value={tagName} variant = "outlined" onChange={handleChangeTag}  />
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={2}>
                            <Button onClick={addTag} variant="outlined">ADD</Button>
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={8}>
                            
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={2}>
                            <Button onClick={props.handleClose} variant="outlined">cancel</Button>
                        </Grid>
                        <Grid style={{marginTop:20}} item xs={2}>
                            {props.note ? 
                                <Button  type="submit" variant="outlined">update</Button>
                            :
                                <Button  type="submit" variant="outlined">save</Button>
                            }
                           
                        </Grid>
                    </form>
                </Grid>
            </div>
            </Fade>
        </Modal>
    )

}