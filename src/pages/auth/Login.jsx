import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginDoctor } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    dispatch(loginDoctor({ email, password }))
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => setError('Login failed. Please check your credentials.'));
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-box">
        <h2 className="doctor-login-title">Doctor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <AiOutlineUser className="input-icon" />
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
            <AiOutlineLock className="input-icon" />
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

          <button type="submit" className="doctor-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
