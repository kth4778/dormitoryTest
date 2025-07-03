import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Navigate 추가
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* 루트 경로를 /login으로 리다이렉트 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 다른 라우트들을 여기에 추가할 수 있습니다. */}
      </Routes>
    </div>
  );
}

export default App;
