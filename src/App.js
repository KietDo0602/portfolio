import React from 'react';
import Home from './Home';
import NotFoundPage from './NotFoundPage';
import ResumePage from './ResumePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Projects from './Projects';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/all-projects" element={<Projects/>} title="Projects"/>
          <Route exact path="/files/resume.pdf" element={<ResumePage />} title="Resume"/>
          <Route path="/404" element={<NotFoundPage />} title="Error"/>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
