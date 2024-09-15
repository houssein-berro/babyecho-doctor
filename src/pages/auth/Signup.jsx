import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupDoctor } from '../../redux/auth/authActions'; // Uncomment and add the action
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');  // Change name to username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    dispatch(signupDoctor({ username, email, password })) // Ensure username is passed
      .then(() => {
        navigate('/dashboard');
      })
      .catch(() => setError('Signup failed. Please try again.'));
  };

  return (
    <div className="doctor-signup-container">
      <div className="doctor-signup-box glass-effect">
        <h2 className="doctor-signup-title">Create Account</h2>
        <p className="signup-subtitle">Sign up to access your doctor account</p>
        <div>
          {/* Username input field */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"  // Changed from Name to Username
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Set username instead of name
              className="doctor-signup-input"
              required
            />
          </div>

          {/* Email input field */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="doctor-signup-input"
              required
            />
          </div>

          {/* Password input field */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="doctor-signup-input"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button */}
          <button
            type="button"
            className="doctor-signup-button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        {/* Link to login */}
        <p className="login-link">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
