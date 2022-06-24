// import { configureStore } from "@reduxjs/toolkit"
// import { authSlice } from "./authSlice"
// import {notesSlice} from "./notesSlice"
// export default configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//     notes: notesSlice.reducer

//   },
// })
import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { authSlice } from "./authSlice"
import {notesSlice} from "./notesSlice"

const reducers = combineReducers({
  auth: authSlice.reducer,
  notes: notesSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;