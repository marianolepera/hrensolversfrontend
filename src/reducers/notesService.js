import axios from 'axios'



const createNote = async (noteData,userId,token) => {
  //const userId= localStorage.getItem('user', JSON.stringify(response.data.payload._id))
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(`https://hr-ensolvers.herokuapp.com/api/notas/${userId}`, noteData,config)
    return response.data
}

const updateNote = async (noteData,noteId,token) => {
    
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
      const response = await axios.put(`https://hr-ensolvers.herokuapp.com/api/notas/${noteId}`, noteData,config)
      return response.data
  } catch (error) {
      console.log(error)
  }
 
  }

const getNotes = async (token) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get("https://hr-ensolvers.herokuapp.com/api/notas/",config)
    return response.data
  }

const getNotesbyUserId = async (userId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`https://hr-ensolvers.herokuapp.com/api/notas/notas/${userId}`,config)
    return response.data
  }

const updateArchiveToTrueOrFalse = async (noteId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      const response = await axios.put(`https://hr-ensolvers.herokuapp.com/api/notas/notas/${noteId}`,null,config)
      return response.data
  
}

const deleteNote = async (noteId,token) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.delete(`https://hr-ensolvers.herokuapp.com/api/notas/${noteId}`,config)
      return response.data
    } catch (error) {
        console.log(error)
    }
  
  }



const notesService = {
  createNote,
  updateNote,
  getNotes,
  getNotesbyUserId,
  updateArchiveToTrueOrFalse,
  deleteNote,
  
}

export default notesService