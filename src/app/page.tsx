'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import LoginModal from '@/components/LoginModal'
import SelfDiagnosis from '@/components/SelfDiagnosis'
import HealthManagement from '@/components/HealthManagement'
import AIChat from '@/components/AIChat'
import HealthReport from '@/components/HealthReport'
import HealthOfficeConnect from '@/components/HealthOfficeConnect'
import VaccinationManagement from '@/components/VaccinationManagement'

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [currentPage, setCurrentPage] = useState('home')

  const requireLogin = (action: () => void) => {
    if (isLoggedIn) {
      action()
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
    setIsLoginModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setCurrentPage('home')
  }

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setCurrentPage('home')
    } else {
      requireLogin(() => setCurrentPage(page))
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'diagnosis':
        return <SelfDiagnosis onComplete={(symptoms, type) => {
          // 진단 완료 후 건강관리 페이지로 이동
          setCurrentPage('health')
        }} />
      case 'health':
        return <HealthManagement type="general" symptoms={[]} />
      case 'report':
        return <HealthReport />
      case 'connect':
        return <HealthOfficeConnect />
      case 'vaccination':
        return <VaccinationManagement />
      case 'chat':
        return <AIChat symptoms={[]} />
      case 'about':
        return (
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  서비스 소개
                </span>
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 서비스 목표</h2>
                    <p className="text-gray-600 leading-relaxed">
                      태장고등학교 학생들이 언제 어디서나 건강 상태를 체크하고 관리할 수 있는 
                      디지털 플랫폼을 제공합니다. 전문적인 의료 서비스에 대한 접근성을 높이고, 
                      예방 중심의 건강 관리 문화를 조성하는 것이 목표입니다.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 핵심 가치</h2>
                    <ul className="text-gray-600 space-y-2">
                      <li>• <strong>접근성:</strong> 24시간 언제든지 이용 가능</li>
                      <li>• <strong>정확성:</strong> AI 기반 정밀 진단 시스템</li>
                      <li>• <strong>편의성:</strong> 직관적이고 사용하기 쉬운 인터페이스</li>
                      <li>• <strong>개인화:</strong> 맞춤형 건강 관리 솔루션</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🚀 주요 기능</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🩺</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">스마트 자가진단</h3>
                      <p className="text-sm text-gray-600">증상 기반 건강 상태 체크</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">AI 건강 상담</h3>
                      <p className="text-sm text-gray-600">24시간 실시간 상담 서비스</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💊</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">건강 관리</h3>
                      <p className="text-sm text-gray-600">종합적인 라이프스타일 관리</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📞 문의하기</h2>
                  <p className="text-gray-600 mb-6">
                    서비스에 대한 문의사항이나 건의사항이 있으시면 언제든지 연락해주세요.
                  </p>
                  <div className="flex justify-center space-x-8">
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">보건실</div>
                      <div className="text-gray-600">내선 123</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">이메일</div>
                      <div className="text-gray-600">health@taejang.ac.kr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <>
            {/* Hero Banner Section */}
            <section className="relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-75"></div>
              <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-150"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-300"></div>
              
              <div className="relative z-10 text-center py-24 px-4">
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                      <span className="text-white/90 text-sm font-medium">태장고등학교 공식 플랫폼</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                      내 손안의
                      <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        보건실
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                      언제 어디서나 스마트한 건강 관리
                    </p>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                      AI 기반 자가진단부터 실시간 상담까지, 
                      학생들을 위한 차세대 디지털 헬스케어 솔루션
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <button 
                      onClick={() => requireLogin(() => setCurrentPage('diagnosis'))}
                      className="group bg-white text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span className="text-2xl group-hover:animate-pulse">🩺</span>
                      <span>자가진단 시작하기</span>
                    </button>
                    <button 
                      onClick={() => requireLogin(() => setCurrentPage('chat'))}
                      className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white/50 shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span className="text-2xl group-hover:animate-bounce">🤖</span>
                      <span>AI 상담받기</span>
                    </button>
                  </div>

                  {/* Real-time Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,247</div>
                      <div className="text-white/80 text-sm md:text-base">활성 사용자</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">3,891</div>
                      <div className="text-white/80 text-sm md:text-base">진단 완료</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,156</div>
                      <div className="text-white/80 text-sm md:text-base">AI 상담</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">98.5%</div>
                      <div className="text-white/80 text-sm md:text-base">만족도</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      핵심 서비스
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    학생들의 건강한 학교생활을 위한 종합 솔루션
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                  <div 
                    className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-100"
                    onClick={() => requireLogin(() => setCurrentPage('diagnosis'))}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">🩺</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">스마트 자가진단</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      AI가 분석하는 증상 기반 건강 체크 시스템. 
                      정확한 진단과 함께 적절한 대응 방법을 제시합니다.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>진단 시작하기</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div 
                    className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-100"
                    onClick={() => requireLogin(() => setCurrentPage('health'))}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">💊</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">종합 건강 관리</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      운동, 식단, 수면 패턴을 체계적으로 관리하고 
                      개인 맞춤 건강 개선 플랜을 제공합니다.
                    </p>
                    <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                      <span>관리 시작하기</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div 
                    className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-100"
                    onClick={() => requireLogin(() => setCurrentPage('chat'))}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">🤖</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">AI 건강 상담</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      24시간 언제든지 AI 의료진과 상담받고 
                      건강에 대한 모든 궁금증을 해결하세요.
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                      <span>상담 시작하기</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Additional Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <h4 className="font-bold text-gray-800">건강 리포트</h4>
                    </div>
                    <p className="text-gray-600 text-sm">개인별 건강 데이터 분석 및 맞춤형 리포트 제공</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🏥</span>
                      </div>
                      <h4 className="font-bold text-gray-800">보건실 연결</h4>
                    </div>
                    <p className="text-gray-600 text-sm">응급상황 시 보건실과 실시간 연결 서비스</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">💉</span>
                      </div>
                      <h4 className="font-bold text-gray-800">예방접종 관리</h4>
                    </div>
                    <p className="text-gray-600 text-sm">예방접종 일정 관리 및 알림 서비스</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-green-600">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    건강한 학교생활,
                    <span className="block text-yellow-300">지금 시작하세요</span>
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    태장고등학교 학생 전용 디지털 헬스케어 플랫폼에서 
                    스마트하고 체계적인 건강 관리를 경험해보세요.
                  </p>
                  
                  {!isLoggedIn ? (
                    <button 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="group bg-white text-gray-800 px-12 py-4 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
                    >
                      <span className="text-2xl group-hover:animate-spin">✨</span>
                      <span>무료로 시작하기</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                        <p className="text-2xl text-white font-bold mb-2">
                          환영합니다, {userName}님! 🎉
                        </p>
                        <p className="text-white/80">건강한 하루를 시작해볼까요?</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={() => setCurrentPage('diagnosis')}
                          className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
                        >
                          🩺 자가진단 하기
                        </button>
                        <button 
                          onClick={() => setCurrentPage('chat')}
                          className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
                        >
                          🤖 AI 상담받기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main>
        {renderPage()}
      </main>

      {isLoginModalOpen && (
        <LoginModal 
          onLogin={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  )
}