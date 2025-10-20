'use client'

import { useState } from 'react'

interface SelfDiagnosisProps {
  onComplete: (symptoms: string[], recommendedType: string) => void
}

const symptomsList = [
  { id: 'cough', label: '기침이 난다', category: 'respiratory' },
  { id: 'stomachache', label: '복통이 있다', category: 'digestive' },
  { id: 'fatigue', label: '피곤하다', category: 'sleep' },
  { id: 'headache', label: '두통이 있다', category: 'stress' },
  { id: 'fever', label: '열이 난다', category: 'respiratory' },
  { id: 'nausea', label: '속이 미식거린다', category: 'digestive' },
  { id: 'dizziness', label: '어지럽다', category: 'circulation' },
  { id: 'insomnia', label: '잠이 잘 안 온다', category: 'sleep' },
  { id: 'anxiety', label: '불안하다', category: 'mental' },
  { id: 'muscle_pain', label: '근육이 아프다', category: 'exercise' }
]

export default function SelfDiagnosis({ onComplete }: SelfDiagnosisProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    const categories = selectedSymptoms.map(id => 
      symptomsList.find(s => s.id === id)?.category
    )
    
    const categoryCount = categories.reduce((acc, cat) => {
      if (cat) acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const dominantCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0]

    let recommendedType = 'general'
    switch (dominantCategory) {
      case 'sleep':
        recommendedType = 'sleep'
        break
      case 'digestive':
      case 'circulation':
        recommendedType = 'diet'
        break
      case 'exercise':
      case 'muscle_pain':
        recommendedType = 'exercise'
        break
      default:
        recommendedType = 'general'
    }

    setShowResult(true)
    setTimeout(() => {
      onComplete(selectedSymptoms, recommendedType)
    }, 2000)
  }

  const getRecommendedTypeText = () => {
    const categories = selectedSymptoms.map(id => 
      symptomsList.find(s => s.id === id)?.category
    )
    
    const categoryCount = categories.reduce((acc, cat) => {
      if (cat) acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const dominantCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0]

    switch (dominantCategory) {
      case 'sleep':
        return { type: '💤 수면 부족형', description: '충분한 수면과 휴식이 필요합니다' }
      case 'digestive':
      case 'circulation':
        return { type: '🍱 식습관 불균형형', description: '균형잡힌 식단 관리가 필요합니다' }
      case 'exercise':
        return { type: '🏃 운동 부족형', description: '규칙적인 운동이 필요합니다' }
      default:
        return { type: '🏥 종합 관리형', description: '전반적인 건강 관리가 필요합니다' }
    }
  }

  if (showResult) {
    const result = getRecommendedTypeText()
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 진단 완료!</h3>
              <div className="text-6xl mb-6">{result.type.split(' ')[0]}</div>
              <h4 className="text-2xl font-semibold text-gray-700 mb-3">{result.type}</h4>
              <p className="text-lg text-gray-600 max-w-md mx-auto">{result.description}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
              <div className="flex justify-center items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <p className="text-blue-700 font-medium">맞춤 관리 페이지로 이동 중...</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>증상 분석 완료</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>맞춤 솔루션 준비</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-500">⏳</span>
                <span>페이지 이동 중</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">�</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">자가 진단 체크리스트</h2>
              <p className="text-blue-100">현재 느끼고 있는 증상을 선택해주세요</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">진행률</span>
              <span className="text-sm">{selectedSymptoms.length}/10</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(selectedSymptoms.length / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {symptomsList.map((symptom) => (
              <label 
                key={symptom.id} 
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedSymptoms.includes(symptom.id)
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom.id)}
                    onChange={() => handleSymptomToggle(symptom.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${
                    selectedSymptoms.includes(symptom.id) ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {symptom.label}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {selectedSymptoms.includes(symptom.id) && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{selectedSymptoms.length}</span>
                  </div>
                  <span className="text-gray-600">개 증상 선택됨</span>
                </div>
              </div>
              
              <button 
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0}
                className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedSymptoms.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg'
                }`}
              >
                {selectedSymptoms.length === 0 ? '증상을 선택해주세요' : '🔍 진단 결과 보기'}
              </button>
            </div>
            
            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 선택하신 증상을 바탕으로 맞춤형 건강 관리 솔루션을 제공해드립니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}