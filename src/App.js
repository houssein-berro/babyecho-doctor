import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/users/users';
import BabyAnalysis from './pages/baby/baby';
import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProtectedRoute from './components/protectedRoute'; // Import the ProtectedRoute

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/baby/:babyId/analysis"
            element={
              <ProtectedRoute>
                <BabyAnalysis />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
