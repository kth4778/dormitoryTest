import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DormitoryHomeScreen from './pages/DormitoryHomeScreen';
import './App.css';

function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname; // 현재 경로 가져오기

    // 토큰이 없고, 현재 경로가 로그인 또는 회원가입 페이지가 아닐 경우에만 리다이렉트
    if (!token && currentPath !== '/login' && currentPath !== '/signup') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

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
        <Route
          path="/home"
          element={user ? <DormitoryHomeScreen /> : <Navigate to="/login" replace />}
        />
        {/* 예시: 기타 보호된 라우트들. 실제 사용 시에는 각 페이지 컴포넌트를 임포트해야 합니다. */}
        <Route
          path="/laundry"
          element={user ? <div>세탁실 예약 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/study"
          element={user ? <div>스터디룸 예약 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/packages"
          element={user ? <div>택배 확인 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/meals"
          element={user ? <div>식단표 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/notifications"
          element={user ? <div>알림 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/notices"
          element={user ? <div>공지사항 목록 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/notice/:id"
          element={user ? <div>공지사항 상세 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reservations"
          element={user ? <div>예약 목록 페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <div>마이페이지 (구현 예정)</div> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;