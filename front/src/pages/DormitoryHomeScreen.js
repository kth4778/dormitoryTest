import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
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
  Home // Home 아이콘 추가
} from 'lucide-react';

const DormitoryHomeScreen = () => {
  const [notifications, setNotifications] = useState(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 샘플 데이터
  const userData = {
    name: "김학생",
    room: "A동 301호",
    profileImage: null // 실제 이미지 URL로 대체 가능
  };

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
    { icon: WashingMachine, label: "세탁실 예약", color: "bg-blue-600", path: "/laundry" },
    { icon: BookOpen, label: "스터디룸 예약", color: "bg-purple-600", path: "/study" },
    { icon: Package, label: "택배 확인", color: "bg-green-600", path: "/packages", badge: pendingPackages },
    { icon: Utensils, label: "식단표", color: "bg-orange-600", path: "/meals" }
  ];

  const recentNotices = [
    { id: 1, title: "기숙사 정기점검 안내", date: "2025.07.01", important: true },
    { id: 2, title: "여름방학 기숙사 운영 안내", date: "2025.06.28", important: false },
    { id: 3, title: "세탁실 이용 규정 변경", date: "2025.06.25", important: false }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20"> {/* 하단 내비게이션 공간 확보 */}
      {/* Header */}
      <header className="bg-white shadow-md px-5 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="프로필" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-gray-900">{userData.name}</h1>
              <p className="text-sm text-gray-600 flex items-center mt-0.5">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {userData.room}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-95">
              <LogOut className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  {notifications}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-8">
        {/* Today's Meal Card */}
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900 flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-orange-600" />
              오늘의 식단
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors active:scale-95" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm font-medium text-gray-700">아침</span>
              <span className="text-sm text-gray-600">{todayMeal.breakfast}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm font-medium text-gray-700">점심</span>
              <span className="text-sm text-gray-600">{todayMeal.lunch}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">저녁</span>
              <span className="text-sm text-gray-600">{todayMeal.dinner}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <h2 className="font-bold text-lg text-gray-900 mb-4">바로가기</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-3xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 relative group active:scale-95"
              >
                <div className={`w-14 h-14 ${action.color} rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-105 transition-transform`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">{action.label}</span>
                {action.badge && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Reservation */}
        {upcomingReservation && (
          <div className="bg-blue-50 rounded-3xl shadow-xl p-5 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-blue-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                예약 현황
              </h2>
              <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">진행중</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-blue-800">
                <span className="font-bold">{upcomingReservation.type}</span> - {upcomingReservation.room}
              </p>
              <p className="text-sm text-blue-600 flex items-center mt-0.5">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                {upcomingReservation.time}
              </p>
            </div>
          </div>
        )}

        {/* Recent Notices */}
        <div className="bg-white rounded-3xl shadow-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900">최근 공지사항</h2>
            <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors active:scale-95" />
          </div>
          <div className="space-y-4">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="flex items-start space-x-3 p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors active:scale-95">
                {notice.important && (
                  <Star className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${notice.important ? 'text-yellow-700' : 'text-gray-900'} truncate`}>
                    {notice.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Alert */}
        {pendingPackages > 0 && (
          <div className="bg-green-50 rounded-3xl shadow-xl p-5 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="font-bold text-green-900 text-base">새로운 택배가 도착했습니다!</p>
                  <p className="text-sm text-green-700 mt-0.5">수령 대기 중인 택배 <span className="font-bold">{pendingPackages}</span>개</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-green-400 cursor-pointer hover:text-green-600 transition-colors active:scale-95" />
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 px-3 rounded-lg text-blue-700 font-bold active:scale-95">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">홈</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-xs">예약</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
            <Package className="w-6 h-6 mb-1" />
            <span className="text-xs">택배</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">공지</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">마이페이지</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DormitoryHomeScreen;