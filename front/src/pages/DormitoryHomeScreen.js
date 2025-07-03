import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch, useSelector 임포트
import axios from 'axios';
import { logout } from '../features/auth/authSlice'; // logout 액션 임포트
import {
  Bell,
  User,
  Calendar,
  Utensils,
  Package,
  WashingMachine,
  BookOpen,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  LogOut,
  Home,
} from 'lucide-react';

const DormitoryHomeScreen = () => {
  const [notifications] = useState(3);
  const { user } = useSelector((state) => state.auth); // Redux 스토어에서 사용자 정보 가져오기

  // 사용자 이름과 방 번호 (Redux user 객체에서 가져오거나 기본값 설정)
  const userName = user?.name || "게스트";
  const userRoom = user?.room || "미정"; // user 객체에 room 정보가 있다고 가정
  const userProfileImage = user?.profileImageUrl || null; // user 객체에 profileImageUrl 정보가 있다고 가정
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch 훅 사용

  

  const todayMeal = {
    breakfast: "김치찌개, 계란말이, 김치",
    lunch: "불고기덮밥, 미역국, 단무지",
    dinner: "치킨마요덮밥, 콩나물국, 김치"
  };

  const pendingPackages = 2;
  const upcomingReservation = {
    type: "스터디룸",
    room: "B동 201호",
    time: "14:00-16:00"
  };

  const quickActions = [
    { icon: WashingMachine, label: "세탁실 예약", color: "#2563eb", path: "/laundry" },
    { icon: BookOpen, label: "스터디룸 예약", color: "#7c3aed", path: "/study" },
    { icon: Package, label: "택배 확인", color: "#16a34a", path: "/packages", badge: pendingPackages },
    { icon: Utensils, label: "식단표", color: "#ea580c", path: "/meals" }
  ];

  const recentNotices = [
    { id: 1, title: "기숙사 정기점검 안내", date: "2025.07.01", important: true },
    { id: 2, title: "여름방학 기숙사 운영 안내", date: "2025.06.28", important: false },
    { id: 3, title: "세탁실 이용 규정 변경", date: "2025.06.25", important: false }
  ];

  const handleLogout = async () => {
    if (!window.confirm('정말 로그아웃 하시겠습니까?')) {
      return;
    }
    try {
      // API 명세서에 따른 로그아웃 요청 (백엔드에서 세션 무효화 등 처리)
      await axios.post('/api/logout');
      console.log('백엔드 로그아웃 요청 성공');
    } catch (error) {
      console.error('백엔드 로그아웃 요청 실패:', error);
      // 백엔드 요청 실패 시에도 클라이언트 측 로그아웃은 진행
    } finally {
      // Redux 스토어의 user 상태를 null로 설정하고 로컬 스토리지 정리
      dispatch(logout());
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  };

  const handleNavigation = (path) => {
    console.log(`네비게이션: ${path}`);
    navigate(path);
  };

  // 스타일 객체들 (이전과 동일)
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      maxWidth: '1024px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    profileImage: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #60a5fa, #2563eb)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    userRoom: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      margin: 0
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    iconButton: {
      padding: '8px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background-color 0.2s'
    },
    main: {
      padding: '24px 16px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    moreButton: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#2563eb',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      gap: '4px'
    },
    mealItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderTop: '1px solid #f3f4f6'
    },
    mealTime: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    mealMenu: {
      fontSize: '14px',
      color: '#6b7280',
      textAlign: 'right',
      maxWidth: '192px'
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    quickActionButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      backgroundColor: 'white',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background-color 0.2s'
    },
    quickActionIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    quickActionLabel: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '14px'
    },
    badge: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      backgroundColor: '#ef4444',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      backgroundColor: '#ef4444',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    reservationCard: {
      backgroundColor: '#eff6ff',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid #bfdbfe',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    reservationHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    reservationTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusBadge: {
      fontSize: '12px',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontWeight: '600'
    },
    reservationButton: {
      marginTop: '16px',
      width: '100%',
      backgroundColor: '#dbeafe',
      color: '#1d4ed8',
      padding: '8px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    noticeItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px',
      margin: '0 -12px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      border: 'none',
      backgroundColor: 'transparent',
      width: '100%',
      textAlign: 'left'
    },
    packageAlert: {
      backgroundColor: '#f0fdf4',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid #bbf7d0',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    packageButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    },
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '8px 16px',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    bottomNavContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      maxWidth: '1024px',
      margin: '0 auto'
    },
    bottomNavButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    bottomNavActive: {
      color: '#2563eb',
      fontWeight: '500'
    },
    bottomNavInactive: {
      color: '#6b7280'
    }
  };

  return (
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.profileSection}>
            <div style={styles.profileImage}>
              {userProfileImage ? (
                  <img src={userProfileImage} alt="프로필" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              ) : (
                  <User size={28} color="white" />
              )}
            </div>
            <div>
              <h1 style={styles.userName}>{userName}</h1>
              <p style={styles.userRoom}>
                <MapPin size={16} />
                {userRoom}
              </p>
            </div>
          </div>
          <div style={styles.headerButtons}>
            <button onClick={handleLogout} style={styles.iconButton}>
              <LogOut size={24} color="#6b7280" />
            </button>
            <button onClick={() => handleNavigation('/notifications')} style={{...styles.iconButton}}>
              <Bell size={24} color="#6b7280" />
              {notifications > 0 && (
                  <span style={styles.notificationBadge}>
                {notifications}
              </span>
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Today's Meal Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <Utensils size={20} color="#ea580c" />
                오늘의 식단
              </h2>
              <button onClick={() => handleNavigation('/meals')} style={styles.moreButton}>
                더보기 <ChevronRight size={16} />
              </button>
            </div>
            <div>
              <div style={styles.mealItem}>
                <span style={styles.mealTime}>아침</span>
                <span style={styles.mealMenu}>{todayMeal.breakfast}</span>
              </div>
              <div style={styles.mealItem}>
                <span style={styles.mealTime}>점심</span>
                <span style={styles.mealMenu}>{todayMeal.lunch}</span>
              </div>
              <div style={styles.mealItem}>
                <span style={styles.mealTime}>저녁</span>
                <span style={styles.mealMenu}>{todayMeal.dinner}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>바로가기</h2>
            <div style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                  <button
                      key={index}
                      onClick={() => handleNavigation(action.path)}
                      style={styles.quickActionButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div style={{...styles.quickActionIcon, backgroundColor: action.color}}>
                      <action.icon size={28} color="white" />
                    </div>
                    <span style={styles.quickActionLabel}>{action.label}</span>
                    {action.badge > 0 && (
                        <span style={styles.badge}>
                    {action.badge}
                  </span>
                    )}
                  </button>
              ))}
            </div>
          </div>

          {/* Current Reservation */}
          {upcomingReservation && (
              <div style={styles.reservationCard}>
                <div style={styles.reservationHeader}>
                  <h2 style={styles.reservationTitle}>
                    <Calendar size={20} color="#2563eb" />
                    예약 현황
                  </h2>
                  <span style={styles.statusBadge}>진행중</span>
                </div>
                <div style={{marginBottom: '8px'}}>
                  <p style={{fontSize: '14px', color: '#1e40af', margin: 0}}>
                    <span style={{fontWeight: 'bold'}}>{upcomingReservation.type}</span> - {upcomingReservation.room}
                  </p>
                  <p style={{fontSize: '14px', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px', margin: 0}}>
                    <Clock size={16} />
                    {upcomingReservation.time}
                  </p>
                </div>
                <button
                    onClick={() => handleNavigation('/reservations')}
                    style={styles.reservationButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#bfdbfe'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dbeafe'}
                >
                  내 예약 전체 보기
                </button>
              </div>
          )}

          {/* Recent Notices */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>최근 공지사항</h2>
              <button onClick={() => handleNavigation('/notices')} style={styles.moreButton}>
                더보기 <ChevronRight size={16} />
              </button>
            </div>
            <div>
              {recentNotices.map((notice) => (
                  <button
                      key={notice.id}
                      onClick={() => handleNavigation(`/notice/${notice.id}`)}
                      style={styles.noticeItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {notice.important && (
                        <Star size={16} color="#eab308" />
                    )}
                    <div style={{flex: 1, minWidth: 0}}>
                      <p style={{fontSize: '14px', fontWeight: '500', color: notice.important ? '#a16207' : '#111827', margin: 0}}>
                        {notice.title}
                      </p>
                      <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px', margin: 0}}>{notice.date}</p>
                    </div>
                  </button>
              ))}
            </div>
          </div>

          {/* Package Alert */}
          {pendingPackages > 0 && (
              <div style={styles.packageAlert}>
                <button onClick={() => handleNavigation('/packages')} style={styles.packageButton}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Package size={24} color="#16a34a" style={{marginRight: '12px'}} />
                    <div>
                      <p style={{fontWeight: 'bold', color: '#14532d', fontSize: '16px', margin: 0}}>새로운 택배가 도착했습니다!</p>
                      <p style={{fontSize: '14px', color: '#166534', margin: 0}}>수령 대기 중인 택배 <span style={{fontWeight: 'bold'}}>{pendingPackages}</span>개</p>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#4ade80" />
                </button>
              </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav style={styles.bottomNav}>
          <div style={styles.bottomNavContainer}>
            <button
                onClick={() => handleNavigation('/home')}
                style={{...styles.bottomNavButton, ...styles.bottomNavActive}}
            >
              <Home size={24} />
              <span style={{fontSize: '12px', marginTop: '4px'}}>홈</span>
            </button>
            <button
                onClick={() => handleNavigation('/reservations')}
                style={{...styles.bottomNavButton, ...styles.bottomNavInactive}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Calendar size={24} />
              <span style={{fontSize: '12px', marginTop: '4px'}}>예약</span>
            </button>
            <button
                onClick={() => handleNavigation('/packages')}
                style={{...styles.bottomNavButton, ...styles.bottomNavInactive}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Package size={24} />
              <span style={{fontSize: '12px', marginTop: '4px'}}>택배</span>
            </button>
            <button
                onClick={() => handleNavigation('/notices')}
                style={{...styles.bottomNavButton, ...styles.bottomNavInactive}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Bell size={24} />
              <span style={{fontSize: '12px', marginTop: '4px'}}>공지</span>
            </button>
            <button
                onClick={() => handleNavigation('/profile')}
                style={{...styles.bottomNavButton, ...styles.bottomNavInactive}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <User size={24} />
              <span style={{fontSize: '12px', marginTop: '4px'}}>마이페이지</span>
            </button>
          </div>
        </nav>
      </div>
  );
};

export default DormitoryHomeScreen;