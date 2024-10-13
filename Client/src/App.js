import React from "react";
import './App.css';
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ChangePassword from "./auth/ChangePassword";
import Profile from "./auth/Profile";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Profile" element={<Profile />} />
          <Route ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;