'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import SelfDiagnosis from '@/components/SelfDiagnosis'
import HealthManagement from '@/components/HealthManagement'
import AIChat from '@/components/AIChat'

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showAIChat, setShowAIChat] = useState(false)
  const [symptoms, setSymptoms] = useState<string[]>([])

  const handleDiagnosisComplete = (selectedSymptoms: string[], recommendedType: string) => {
    setSymptoms(selectedSymptoms)
    setSelectedType(recommendedType)
  }

  if (showAIChat) {
    return (
      <div className="min-h-screen">
        <Header onBack={() => setShowAIChat(false)} />
        <AIChat symptoms={symptoms} />
      </div>
    )
  }

  if (selectedType) {
    return (
      <div className="min-h-screen">
        <Header onBack={() => setSelectedType(null)} />
        <HealthManagement type={selectedType} symptoms={symptoms} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            내 손안의 보건실
          </h1>
          <p className="text-xl text-gray-600 mb-2">태장고등학교</p>
          <p className="text-gray-500">건강한 학교생활을 위한 디지털 헬스케어 플랫폼</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SelfDiagnosis onComplete={handleDiagnosisComplete} />
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🤖 AI 1:1 상담</h2>
              <p className="text-gray-600 mb-4">
                건강 관련 궁금한 점을 AI와 상담해보세요
              </p>
              <button 
                onClick={() => setShowAIChat(true)}
                className="btn-primary w-full"
              >
                AI 상담 시작하기
              </button>
            </div>

            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 건강 관리 현황</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">7.5</div>
                  <div className="text-sm text-gray-600">평균 수면시간</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">건강 점수</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">운동 횟수/주</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}