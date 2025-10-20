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
      <div className="card">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">진단 완료</h3>
            <div className="text-4xl mb-4">{result.type.split(' ')[0]}</div>
            <h4 className="text-xl font-medium text-gray-700 mb-2">{result.type}</h4>
            <p className="text-gray-600">{result.description}</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">맞춤 관리 페이지로 이동 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🧾 자가 진단 체크리스트</h2>
      <p className="text-gray-600 mb-6">현재 느끼고 있는 증상을 선택해주세요</p>
      
      <div className="space-y-3 mb-6">
        {symptomsList.map((symptom) => (
          <label 
            key={symptom.id} 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom.id)}
              onChange={() => handleSymptomToggle(symptom.id)}
              className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
            />
            <span className="text-gray-700">{symptom.label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {selectedSymptoms.length}개 증상 선택됨
        </p>
        <button 
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          진단 결과 보기
        </button>
      </div>
    </div>
  )
}