// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice'; 
import recordingsReducer from './recordings/recordingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    recordings: recordingsReducer, // Add recordings slice here

  },
});

export default store;
