import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import axios from 'axios';

export const loginDoctor = ({ email, password }, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // Make the login API call
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/doctor/login`, { email, password });

    const token = response.data.token;

    // Decode the token


    // Save token in localStorage
    localStorage.setItem('token', token);

    // Dispatch login success action with user data
    dispatch(loginSuccess(response.data));

    // Perform navigation after successful login
    navigate('/patients');
    
    return response.data; // Return response for success
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    return Promise.reject(errorMessage); // Return error for failure
  }
};

export const signupDoctor = ({ username, email, password }, navigate) => async (dispatch) => {
    try {
      dispatch(loginStart());
  
      const type = 'Doctor';
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, { username, email, password, type });
  
      const token = response.data.token;
  
      localStorage.setItem('token', token);
  
      dispatch(loginSuccess(response.data));
  
      navigate('/patients');
  
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      dispatch(loginFailure(errorMessage));
      return Promise.reject(errorMessage); // Return error for failure
    }
  };
  
  export const logoutDoctor = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};
