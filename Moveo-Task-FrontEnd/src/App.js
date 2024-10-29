import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupAdmin from './components/SignupAdmin';
import SignupUser from './components/SignupUser';
import Login from './components/Login';
import MainPlayer from './components/PlayerMain';
import AdminMain from './components/AdminMain';
import LivePage from './components/LivePage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup-admin" element={<SignupAdmin />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MainPlayer" element={<MainPlayer />} />
        <Route path="/AdminMain" element={<AdminMain />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
