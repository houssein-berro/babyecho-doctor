// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice'; 
import recordingsReducer from './recordings/recordingSlice';
import authReducer from './auth/authSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    recordings: recordingsReducer, 
  },
});

export default store;
