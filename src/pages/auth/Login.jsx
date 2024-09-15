import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginDoctor } from '../../redux/auth/authActions';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function

  useEffect(()=>{
    localStorage.clear('token')
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await dispatch(loginDoctor({ email, password }, navigate)); // Pass navigate to the action
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-box glass-effect">
        <h2 className="doctor-login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to your doctor account</p>
        <div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="doctor-login-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="doctor-login-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="button"
            className="doctor-login-button"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
