import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/users/users';
import BabyAnalysis from './pages/baby/baby';
import './App.css'
function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/baby/:babyId/analysis" element={<BabyAnalysis />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>);
}

export default App;
