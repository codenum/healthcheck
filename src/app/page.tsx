'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import LoginModal from '@/components/LoginModal'
import SelfDiagnosis from '@/components/SelfDiagnosis'
import HealthManagement from '@/components/HealthManagement'
import AIChat from '@/components/AIChat'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'diagnosis' | 'management' | 'chat'>('home')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userName, setUserName] = useState('')

  const handleDiagnosisComplete = (selectedSymptoms: string[], recommendedType: string) => {
    setSymptoms(selectedSymptoms)
    setSelectedType(recommendedType)
    setCurrentPage('management')
  }

  const handleLogin = (name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setCurrentPage('home')
  }

  const navigateTo = (page: 'home' | 'diagnosis' | 'management' | 'chat') => {
    setCurrentPage(page)
  }

  // 로그인이 필요한 기능 접근 시 체크
  const requireLogin = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      callback()
    }
  }

  if (currentPage === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header 
          onBack={() => navigateTo('home')} 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />
        <AIChat symptoms={symptoms} />
        {showLoginModal && (
          <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    )
  }

  if (currentPage === 'management' && selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header 
          onBack={() => navigateTo('home')} 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />
        <HealthManagement type={selectedType} symptoms={symptoms} />
        {showLoginModal && (
          <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    )
  }

  if (currentPage === 'diagnosis') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header 
          onBack={() => navigateTo('home')} 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />
        <div className="container mx-auto px-4 py-8">
          <SelfDiagnosis onComplete={handleDiagnosisComplete} />
        </div>
        {showLoginModal && (
          <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
                <span className="text-4xl">🏥</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              내 손안의 <span className="text-blue-600">보건실</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">태장고등학교</p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              AI 기반 건강 진단부터 맞춤형 관리까지<br />
              스마트한 디지털 헬스케어 플랫폼
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => requireLogin(() => navigateTo('diagnosis'))}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🩺 건강 진단 시작하기
              </button>
              <button 
                onClick={() => requireLogin(() => navigateTo('chat'))}
                className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-600"
              >
                🤖 AI 상담하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">주요 서비스</h2>
            <p className="text-xl text-gray-600">학생 맞춤형 건강 관리 솔루션</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🧾',
                title: '자가 진단',
                description: '간편한 체크리스트로 건강 상태를 확인하세요',
                action: () => requireLogin(() => navigateTo('diagnosis'))
              },
              {
                icon: '💤',
                title: '수면 관리',
                description: '수면 패턴 분석과 개선 방안을 제공합니다',
                action: () => requireLogin(() => { setSelectedType('sleep'); navigateTo('management'); })
              },
              {
                icon: '🍱',
                title: '식단 관리',
                description: '영양 균형과 식습관 개선을 도와드립니다',
                action: () => requireLogin(() => { setSelectedType('diet'); navigateTo('management'); })
              },
              {
                icon: '🏃',
                title: '운동 관리',
                description: '맞춤형 운동 프로그램과 건강 관리',
                action: () => requireLogin(() => { setSelectedType('exercise'); navigateTo('management'); })
              }
            ].map((feature, index) => (
              <div 
                key={index}
                onClick={feature.action}
                className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">건강 관리 현황</h2>
              <p className="text-xl opacity-90">실시간 건강 데이터 분석</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: '7.5시간', label: '평균 수면시간', icon: '😴' },
                { value: '85%', label: '건강 점수', icon: '💚' },
                { value: '3회/주', label: '운동 횟수', icon: '🏃‍♂️' },
                { value: '2,100kcal', label: '일일 섭취량', icon: '🍎' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            태장고등학교 학생들을 위한 특별한 건강 관리 서비스를 경험해보세요
          </p>
          <button 
            onClick={() => requireLogin(() => navigateTo('diagnosis'))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            무료로 시작하기 →
          </button>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  )
}