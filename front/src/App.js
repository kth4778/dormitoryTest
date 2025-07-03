import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // useSelector 추가
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DormitoryHomeScreen from './pages/DormitoryHomeScreen'; // DormitoryHomeScreen 추가
import './App.css';

function App() {
  const { user } = useSelector((state) => state.auth); // 로그인 상태 가져오기

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 로그인 상태에 따라 홈 또는 로그인 페이지로 리다이렉트 */}
        <Route
          path="/"
          element={user ? <DormitoryHomeScreen /> : <Navigate to="/login" replace />}
        />
        {/* 다른 라우트들을 여기에 추가할 수 있습니다. */}
      </Routes>
    </div>
  );
}

export default App;
