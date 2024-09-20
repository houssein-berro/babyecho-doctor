import axios from 'axios';
import { fetchRecordingsStart, fetchRecordingsSuccess, fetchRecordingsFailure } from './recordingSlice';

export const fetchRecordingsByBaby = (babyId) => async (dispatch) => {
  dispatch(fetchRecordingsStart());
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recordings/baby/${babyId}`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    dispatch(fetchRecordingsSuccess(response.data));
  } catch (err) {
    dispatch(fetchRecordingsFailure(err.message));
  }
};
