'use client'

import { useState } from 'react'

interface ExerciseManagementProps {
  symptoms: string[]
}

interface WorkoutVideo {
  id: string
  title: string
  duration: string
  difficulty: string
  type: string
  thumbnail: string
}

export default function ExerciseManagement({ symptoms }: ExerciseManagementProps) {
  const [selectedCategory, setSelectedCategory] = useState('stretching')
  const [weeklyGoal, setWeeklyGoal] = useState(3)
  const [completedDays, setCompletedDays] = useState(2)

  const categories = [
    { id: 'stretching', label: '스트레칭', emoji: '🧘‍♀️' },
    { id: 'cardio', label: '유산소', emoji: '🏃‍♂️' },
    { id: 'strength', label: '근력운동', emoji: '💪' },
    { id: 'yoga', label: '요가', emoji: '🧘‍♀️' }
  ]

  const workoutVideos: Record<string, WorkoutVideo[]> = {
    stretching: [
      {
        id: '1',
        title: '목과 어깨 스트레칭',
        duration: '10분',
        difficulty: '초급',
        type: '스트레칭',
        thumbnail: '🧘‍♀️'
      },
      {
        id: '2',
        title: '전신 스트레칭 루틴',
        duration: '15분',
        difficulty: '초급',
        type: '스트레칭',
        thumbnail: '🤸‍♀️'
      },
      {
        id: '3',
        title: '허리 통증 완화 스트레칭',
        duration: '12분',
        difficulty: '초급',
        type: '스트레칭',
        thumbnail: '🧘‍♂️'
      }
    ],
    cardio: [
      {
        id: '4',
        title: '집에서 하는 유산소 운동',
        duration: '20분',
        difficulty: '중급',
        type: '유산소',
        thumbnail: '🏃‍♀️'
      },
      {
        id: '5',
        title: '초보자 유산소 루틴',
        duration: '15분',
        difficulty: '초급',
        type: '유산소',
        thumbnail: '🚴‍♀️'
      }
    ],
    strength: [
      {
        id: '6',
        title: '맨몸 근력운동',
        duration: '25분',
        difficulty: '중급',
        type: '근력운동',
        thumbnail: '💪'
      },
      {
        id: '7',
        title: '코어 강화 운동',
        duration: '18분',
        difficulty: '중급',
        type: '근력운동',
        thumbnail: '🔥'
      }
    ],
    yoga: [
      {
        id: '8',
        title: '초보자를 위한 요가',
        duration: '30분',
        difficulty: '초급',
        type: '요가',
        thumbnail: '🧘‍♀️'
      },
      {
        id: '9',
        title: '스트레스 해소 요가',
        duration: '25분',
        difficulty: '초급',
        type: '요가',
        thumbnail: '🕯️'
      }
    ]
  }

  const weekDays = ['월', '화', '수', '목', '금', '토', '일']
  const completedPattern = [true, true, false, false, false, false, false]

  return (
    <div className="space-y-6">
      {/* 운동 현황 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 이번 주 운동 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{completedDays}/{weeklyGoal}</div>
            <div className="text-sm text-gray-600">목표 달성</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">125</div>
            <div className="text-sm text-gray-600">소모 칼로리</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">45분</div>
            <div className="text-sm text-gray-600">총 운동시간</div>
          </div>
        </div>

        {/* 주간 운동 달력 */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-sm text-gray-600 mb-2">{day}</div>
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                  completedPattern[index]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {completedPattern[index] ? '✓' : (index + 1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 운동 목표 설정 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 주간 운동 목표</h3>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">주</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                onClick={() => setWeeklyGoal(num)}
                className={`w-10 h-10 rounded border-2 ${
                  weeklyGoal >= num
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <span className="text-gray-600">회 운동하기</span>
        </div>
      </div>

      {/* 운동 카테고리 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏃‍♀️ 홈트레이닝 영상</h3>
        
        {/* 카테고리 선택 */}
        <div className="flex space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.emoji} {category.label}
            </button>
          ))}
        </div>

        {/* 영상 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutVideos[selectedCategory]?.map((video) => (
            <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
                {video.thumbnail}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-800 mb-2">{video.title}</h4>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{video.duration}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    video.difficulty === '초급' 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {video.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 운동 추천 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI 맞춤 운동 추천</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 근육 통증 증상이 있으시군요. 격렬한 운동보다는 가벼운 스트레칭부터 시작하시는 것을 추천합니다.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              💡 이번 주 목표 달성률이 {Math.round((completedDays / weeklyGoal) * 100)}%입니다. 
              오늘 15분 스트레칭으로 시작해보세요!
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              💡 수면 부족으로 인한 피로감이 있다면, 저녁에 가벼운 요가나 명상을 통해 몸과 마음을 이완시켜보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}