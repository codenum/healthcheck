'use client'

import { useState } from 'react'
import SleepManagement from './management/SleepManagement'
import DietManagement from './management/DietManagement'
import ExerciseManagement from './management/ExerciseManagement'
import GeneralManagement from './management/GeneralManagement'

interface HealthManagementProps {
  type: string
  symptoms: string[]
}

export default function HealthManagement({ type, symptoms }: HealthManagementProps) {
  const [activeTab, setActiveTab] = useState(type)

  const tabs = [
    { id: 'sleep', label: '💤 수면 관리', emoji: '💤' },
    { id: 'diet', label: '🍱 식단 관리', emoji: '🍱' },
    { id: 'exercise', label: '🏃 운동 관리', emoji: '🏃' },
    { id: 'general', label: '🏥 종합 관리', emoji: '🏥' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'sleep':
        return <SleepManagement symptoms={symptoms} />
      case 'diet':
        return <DietManagement symptoms={symptoms} />
      case 'exercise':
        return <ExerciseManagement symptoms={symptoms} />
      default:
        return <GeneralManagement symptoms={symptoms} />
    }
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">건강 관리</h1>
        <p className="text-gray-600">맞춤형 건강 관리 솔루션을 제공합니다</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 px-6 py-4 text-center transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{tab.emoji}</div>
              <div className="text-sm font-medium">{tab.label.split(' ')[1]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      {renderContent()}
    </div>
  )
}