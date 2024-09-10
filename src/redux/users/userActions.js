// userActions.js
import axios from 'axios';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from './userSlice';

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    console.log('Fetching users from backend...'); 
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/`)
        console.log('Fetched users:', response.data);
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    dispatch(fetchUsersFailure(error.message));
  }
};
