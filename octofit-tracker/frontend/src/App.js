import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit logo" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="hero-section text-center">
                <h1 className="display-4 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
                <p className="lead mb-4">Track your fitness activities, teams, workouts and leaderboard.</p>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <NavLink className="btn btn-light btn-lg" to="/users">Users</NavLink>
                  <NavLink className="btn btn-outline-light btn-lg" to="/teams">Teams</NavLink>
                  <NavLink className="btn btn-outline-light btn-lg" to="/activities">Activities</NavLink>
                  <NavLink className="btn btn-outline-light btn-lg" to="/workouts">Workouts</NavLink>
                  <NavLink className="btn btn-outline-light btn-lg" to="/leaderboard">Leaderboard</NavLink>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
