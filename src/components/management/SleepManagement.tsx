'use client'

import { useState } from 'react'

interface SleepManagementProps {
  symptoms: string[]
}

export default function SleepManagement({ symptoms }: SleepManagementProps) {
  const [sleepTime, setSleepTime] = useState('23:00')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [sleepQuality, setSleepQuality] = useState(3)

  const calculateSleepHours = () => {
    const sleep = new Date(`2000-01-01 ${sleepTime}`)
    const wake = new Date(`2000-01-02 ${wakeTime}`)
    const diff = wake.getTime() - sleep.getTime()
    return diff / (1000 * 60 * 60)
  }

  return (
    <div className="space-y-6">
      {/* 수면 분석 카드 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">💤 수면 패턴 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{calculateSleepHours().toFixed(1)}시간</div>
            <div className="text-sm text-gray-600">평균 수면시간</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{sleepQuality}/5</div>
            <div className="text-sm text-gray-600">수면 질</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">수면 효율</div>
          </div>
        </div>
      </div>

      {/* 수면 기록 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 수면 기록</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">취침 시간</label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기상 시간</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">수면 질 (1-5)</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setSleepQuality(rating)}
                className={`w-12 h-12 rounded-full border-2 ${
                  sleepQuality >= rating
                    ? 'bg-yellow-400 border-yellow-400 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 명상 음악 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🎵 명상 음악</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                🌙
              </div>
              <div>
                <h4 className="font-medium text-gray-800">수면 유도 음악</h4>
                <p className="text-sm text-gray-600">편안한 잠을 위한 음악</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                🧘
              </div>
              <div>
                <h4 className="font-medium text-gray-800">명상 가이드</h4>
                <p className="text-sm text-gray-600">마음을 진정시키는 명상</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI 추천 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI 수면 개선 제안</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 현재 수면시간이 {calculateSleepHours().toFixed(1)}시간입니다. 
              청소년에게 권장되는 8-9시간 수면을 위해 {sleepTime}보다 1시간 일찍 잠자리에 드시는 것을 추천합니다.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              💡 잠들기 1시간 전부터는 스마트폰이나 컴퓨터 사용을 줄이고, 따뜻한 차를 마시거나 독서를 하는 것이 좋습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}