import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notesService from './notesService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  activeNote: null,
  message: '',
}

export const createNote = createAsyncThunk(
    'notes/create',
    async (noteData, thunkAPI) => {
      try {
        const userId = thunkAPI.getState().auth.user.payload._id
        const token = thunkAPI.getState().auth.user.token
        // return await notesService.createNote(noteData, token)
        let notas = await notesService.createNote(noteData,userId,token)
        return notas
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const updateNote = createAsyncThunk(
  'notes/update',
  async (noteData,noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      let notasUpdate =  await notesService.updateNote(noteData,noteId,token)
      return notasUpdate
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getNotesbyUserId = createAsyncThunk(
    'notes/getNotesByUser',
    async ( _,thunkAPI) => {
      try {
        const userId = thunkAPI.getState().auth.user.payload._id
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotesbyUserId(userId,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const updateArchiveToTrueOrFalse = createAsyncThunk(
  'notes/updateArchive',
  async (noteId,thunkAPI) => {
    try {
      //const userId = thunkAPI.getState().auth.user.payload._id
      const token = thunkAPI.getState().auth.user.token
      await notesService.updateArchiveToTrueOrFalse(noteId,token)
      return noteId
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

  export const getNotes = createAsyncThunk(
    'notesSinUser/getNotes',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotes(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const deleteNote = createAsyncThunk(
    'notes/delete',
    async (noteId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        await notesService.deleteNote(noteId,token)

        return noteId
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


  export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
      reset: (state) => initialState,
      setActiveNote: (state, action ) => {
        state.activeNote = action.payload;
        state.messageSaved = '';
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createNote.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes.push(action.payload)
        })
        .addCase(createNote.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(updateNote.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateNote.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = state.notes.map( note => {

            if ( note.id === action.payload._id ) {
                return action.payload;
            }

            return note;
        })
        })
        .addCase(updateNote.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(updateArchiveToTrueOrFalse.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateArchiveToTrueOrFalse.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = state.notes.map(
            (note) => (note._id == action.payload) ? {
              
              ...note, archive: !note.archive
            }
            :
            note
          )
        })
        .addCase(updateArchiveToTrueOrFalse.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getNotesbyUserId.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getNotesbyUserId.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = action.payload
        })
        .addCase(getNotesbyUserId.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteNote.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = state.notes.filter(
            (note) => note._id !== action.payload
          )
        })
        .addCase(deleteNote.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })

  
  export const { reset,setActiveNote } = notesSlice.actions

  export default notesSlice.reducer

  