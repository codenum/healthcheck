'use client'

import { useState } from 'react'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isLoggedIn: boolean
  userName: string
  onLogin: () => void
  onLogout: () => void
}

export default function Navigation({ 
  currentPage, 
  onNavigate, 
  isLoggedIn, 
  userName, 
  onLogin, 
  onLogout 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'diagnosis', label: '자가진단', icon: '🩺' },
    { id: 'health', label: '건강관리', icon: '💊' },
    { id: 'report', label: '건강리포트', icon: '📊' },
    { id: 'connect', label: '보건실 연결', icon: '🏥' },
    { id: 'vaccination', label: '예방접종', icon: '💉' },
    { id: 'chat', label: 'AI상담', icon: '🤖' },
    { id: 'about', label: '서비스 소개', icon: 'ℹ️' }
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏥</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                내 손안의 보건실
              </h1>
              <p className="text-xs text-gray-500">태장고등학교</p>
            </div>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* 사용자 영역 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {userName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userName}님</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                로그인
              </button>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}