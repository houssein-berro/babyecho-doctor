import axios from 'axios';
import { fetchRecordingsStart, fetchRecordingsSuccess, fetchRecordingsFailure } from './recordingSlice';

export const fetchRecordingsByBaby = (babyId) => async (dispatch) => {
  dispatch(fetchRecordingsStart());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recordings/baby/${babyId}`);
    dispatch(fetchRecordingsSuccess(response.data));
  } catch (err) {
    dispatch(fetchRecordingsFailure(err.message));
  }
};
