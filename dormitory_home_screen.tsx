import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';

const DormitoryHomeScreen = () => {
  const [notifications, setNotifications] = useState(3);
  
  // 샘플 데이터
  const userData = {
    name: "김학생",
    room: "A동 301호",
    profileImage: null
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
    { icon: WashingMachine, label: "세탁실 예약", color: "bg-blue-500", path: "/laundry" },
    { icon: BookOpen, label: "스터디룸 예약", color: "bg-purple-500", path: "/study" },
    { icon: Package, label: "택배 확인", color: "bg-green-500", path: "/packages", badge: pendingPackages },
    { icon: Utensils, label: "식단표", color: "bg-orange-500", path: "/meals" }
  ];

  const recentNotices = [
    { id: 1, title: "기숙사 정기점검 안내", date: "2025.07.01", important: true },
    { id: 2, title: "여름방학 기숙사 운영 안내", date: "2025.06.28", important: false },
    { id: 3, title: "세탁실 이용 규정 변경", date: "2025.06.25", important: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="프로필" className="w-full h-full rounded-full" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">{userData.name}</h1>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {userData.room}
              </p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Today's Meal Card */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-orange-500" />
              오늘의 식단
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">아침</span>
              <span className="text-sm text-gray-600">{todayMeal.breakfast}</span>
            </div>
            <div className="flex justify-between items-center">
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
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-900 mb-4">바로가기</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors relative"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">{action.label}</span>
                {action.badge && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Reservation */}
        {upcomingReservation && (
          <div className="bg-blue-50 rounded-xl shadow-sm p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-blue-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                예약 현황
              </h2>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">진행중</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-blue-800">
                <span className="font-medium">{upcomingReservation.type}</span> - {upcomingReservation.room}
              </p>
              <p className="text-sm text-blue-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {upcomingReservation.time}
              </p>
            </div>
          </div>
        )}

        {/* Recent Notices */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">최근 공지사항</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="flex items-start space-x-3">
                {notice.important && (
                  <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
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
          <div className="bg-green-50 rounded-xl shadow-sm p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="font-semibold text-green-900">새로운 택배가 도착했습니다!</p>
                  <p className="text-sm text-green-700">수령 대기 중인 택배 {pendingPackages}개</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-green-400" />
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 text-blue-500">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs font-medium">홈</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-xs">예약</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <Package className="w-6 h-6 mb-1" />
            <span className="text-xs">택배</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">공지</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">마이페이지</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DormitoryHomeScreen;