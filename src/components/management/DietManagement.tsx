'use client'

import { useState } from 'react'
import { Info, CheckCircle, AlertCircle } from 'lucide-react'

interface DietManagementProps {
  symptoms: string[]
}

interface FoodItem {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface RecommendedFood {
  name: string
  emoji: string
  nutrients: string
  benefit: string
}

export default function DietManagement({ symptoms }: DietManagementProps) {
  const [activeTab, setActiveTab] = useState<'record' | 'recommend'>('record')
  const [selectedMeal, setSelectedMeal] = useState('breakfast')
  const [foodLog, setFoodLog] = useState<FoodItem[]>([])
  const [newFood, setNewFood] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('general')

  const meals = [
    { id: 'breakfast', label: '아침', emoji: '🌅' },
    { id: 'lunch', label: '점심', emoji: '☀️' },
    { id: 'dinner', label: '저녁', emoji: '🌙' },
    { id: 'snack', label: '간식', emoji: '🍎' }
  ]

  const conditions = [
    { id: 'general', label: '일반 건강', emoji: '💪' },
    { id: 'cold', label: '감기/호흡기', emoji: '😷' },
    { id: 'stomach', label: '소화불량/복통', emoji: '🤢' },
    { id: 'fatigue', label: '피로회복', emoji: '🔋' },
    { id: 'anemia', label: '빈혈', emoji: '🩸' },
    { id: 'brain', label: '집중력/두뇌', emoji: '🧠' },
    { id: 'stress', label: '스트레스', emoji: '😌' },
  ]

  const foodRecommendations: Record<string, RecommendedFood[]> = {
    general: [
      { name: '사과', emoji: '🍎', nutrients: '비타민C, 식이섬유', benefit: '아침에 먹으면 "금사과"라고 불리며, 장 운동을 돕고 피로 회복에 좋습니다.' },
      { name: '계란', emoji: '🥚', nutrients: '단백질, 비타민D', benefit: '완전 식품으로 불리며, 근육 형성과 면역력 강화에 필수적입니다.' },
      { name: '토마토', emoji: '🍅', nutrients: '라이코펜, 비타민K', benefit: '강력한 항산화 작용을 하며 혈관 건강에 도움을 줍니다.' },
    ],
    cold: [
      { name: '생강차', emoji: '🍵', nutrients: '진저롤, 쇼가올', benefit: '몸을 따뜻하게 하고 염증을 완화하여 목감기에 효과적입니다.' },
      { name: '배', emoji: '🍐', nutrients: '루테올린', benefit: '기관지 염증을 가라앉히고 가래를 삭이는 데 도움을 줍니다.' },
      { name: '유자차', emoji: '🍋', nutrients: '비타민C, 구연산', benefit: '레몬보다 비타민C가 3배 많아 감기 예방과 피로 회복에 좋습니다.' },
    ],
    stomach: [
      { name: '매실', emoji: '🫒', nutrients: '유기산', benefit: '소화액 분비를 촉진하고 살균 작용을 하여 배탈에 좋습니다.' },
      { name: '양배추', emoji: '🥬', nutrients: '비타민U', benefit: '위 점막을 보호하고 재생을 도와 위염 완화에 탁월합니다.' },
      { name: '무', emoji: '🥕', nutrients: '디아스타아제', benefit: '천연 소화제로 불리며 탄수화물 소화를 돕습니다.' },
    ],
    fatigue: [
      { name: '바나나', emoji: '🍌', nutrients: '비타민B, 마그네슘', benefit: '에너지 생성을 돕고 근육의 긴장을 풀어주어 피로 회복에 좋습니다.' },
      { name: '아몬드', emoji: '🥜', nutrients: '마그네슘, 비타민E', benefit: '에너지 대사를 돕고 항산화 작용을 하여 활력을 줍니다.' },
      { name: '브로콜리', emoji: '🥦', nutrients: '비타민C, 철분', benefit: '피로 물질을 분해하고 면역력을 높여줍니다.' },
    ],
    anemia: [
      { name: '시금치', emoji: '🥬', nutrients: '철분, 엽산', benefit: '철분이 풍부하여 적혈구 생성을 돕고 빈혈 예방에 좋습니다.' },
      { name: '소고기', emoji: '🥩', nutrients: '철분, 단백질', benefit: '흡수율이 높은 헴철이 풍부하여 빈혈 개선에 가장 효과적입니다.' },
      { name: '미역', emoji: '🌿', nutrients: '철분, 칼슘', benefit: '피를 맑게 하고 철분 보충에 도움을 줍니다.' },
    ],
    brain: [
      { name: '등푸른 생선', emoji: '🐟', nutrients: '오메가-3', benefit: 'DHA가 풍부하여 뇌 세포를 활성화하고 기억력 향상에 도움을 줍니다.' },
      { name: '블루베리', emoji: '🫐', nutrients: '안토시아닌', benefit: '강력한 항산화 작용으로 뇌 노화를 막고 집중력을 높여줍니다.' },
      { name: '호두', emoji: '🌰', nutrients: '비타민E, 오메가-3', benefit: '뇌신경 세포를 보호하고 인지 기능 저하를 막아줍니다.' },
    ],
    stress: [
      { name: '다크 초콜릿', emoji: '🍫', nutrients: '폴리페놀', benefit: '스트레스 호르몬 수치를 낮추고 기분을 좋게 합니다.' },
      { name: '우유', emoji: '🥛', nutrients: '트립토판, 칼슘', benefit: '신경을 안정시키고 숙면을 유도하여 스트레스 해소에 좋습니다.' },
    ]
  }

  const schoolMenu = [
    { meal: '오늘 급식', menu: ['김치찌개', '계란말이', '시금치나물', '김치', '쌀밥'] },
    { meal: '내일 급식', menu: ['된장찌개', '불고기', '콩나물무침', '깍두기', '쌀밥'] }
  ]

  const nutritionGoal = {
    calories: 2200,
    protein: 80,
    carbs: 300,
    fat: 60
  }

  const currentNutrition = foodLog.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="space-y-6">
      {/* 탭 전환 */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('record')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'record'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          📝 식단 기록
        </button>
        <button
          onClick={() => setActiveTab('recommend')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'recommend'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          🥗 식품 영양 추천
        </button>
      </div>

      {activeTab === 'record' ? (
        <>
          {/* 영양소 현황 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 오늘의 영양소 섭취 현황</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#e5e7eb" strokeWidth="4" fill="none"
                    />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#3b82f6" strokeWidth="4" fill="none"
                      strokeDasharray={`${(currentNutrition.calories / nutritionGoal.calories) * 175.9} 175.9`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {Math.round((currentNutrition.calories / nutritionGoal.calories) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800">칼로리</div>
                <div className="text-xs text-gray-600">{currentNutrition.calories}/{nutritionGoal.calories}kcal</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#e5e7eb" strokeWidth="4" fill="none"
                    />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#10b981" strokeWidth="4" fill="none"
                      strokeDasharray={`${(currentNutrition.protein / nutritionGoal.protein) * 175.9} 175.9`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {Math.round((currentNutrition.protein / nutritionGoal.protein) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800">단백질</div>
                <div className="text-xs text-gray-600">{currentNutrition.protein.toFixed(1)}/{nutritionGoal.protein}g</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#e5e7eb" strokeWidth="4" fill="none"
                    />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#f59e0b" strokeWidth="4" fill="none"
                      strokeDasharray={`${(currentNutrition.carbs / nutritionGoal.carbs) * 175.9} 175.9`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {Math.round((currentNutrition.carbs / nutritionGoal.carbs) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800">탄수화물</div>
                <div className="text-xs text-gray-600">{currentNutrition.carbs.toFixed(1)}/{nutritionGoal.carbs}g</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#e5e7eb" strokeWidth="4" fill="none"
                    />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="#ef4444" strokeWidth="4" fill="none"
                      strokeDasharray={`${(currentNutrition.fat / nutritionGoal.fat) * 175.9} 175.9`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {Math.round((currentNutrition.fat / nutritionGoal.fat) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800">지방</div>
                <div className="text-xs text-gray-600">{currentNutrition.fat.toFixed(1)}/{nutritionGoal.fat}g</div>
              </div>
            </div>
          </div>

          {/* 급식 정보 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🍱 학교 급식 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schoolMenu.map((menu, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">{menu.meal}</h4>
                  <ul className="space-y-1">
                    {menu.menu.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 식단 기록 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 식단 기록</h3>
            
            {/* 식사 선택 탭 */}
            <div className="flex space-x-2 mb-4">
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMeal === meal.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {meal.emoji} {meal.label}
                </button>
              ))}
            </div>

            {/* 음식 추가 */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                placeholder="음식명을 입력하세요"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="btn-primary">추가</button>
            </div>

            {/* 오늘의 섭취 기록 */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">오늘 먹은 음식</h4>
              {foodLog.length === 0 ? (
                <p className="text-gray-500 text-sm">아직 기록된 음식이 없습니다.</p>
              ) : (
                <div className="space-y-2">
                  {foodLog.map((food, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-800">{food.name}</span>
                      <span className="text-xs text-gray-600">{food.calories}kcal</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI 영양 추천 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI 영양 관리 제안</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 현재 단백질 섭취량이 목표치의 {Math.round((currentNutrition.protein / nutritionGoal.protein) * 100)}%입니다. 
                  달걀, 닭가슴살, 두부 등 단백질이 풍부한 음식을 더 섭취해보세요.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  💡 복통 증상이 있으시군요. 맵고 자극적인 음식보다는 소화가 잘 되는 죽이나 따뜻한 국물 요리를 추천합니다.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* 식품 영양 추천 컨텐츠 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">건강 상태별 맞춤 음식 추천</h3>
            <p className="text-gray-600 mb-6">
              현재 건강 상태나 고민에 맞는 음식을 추천해드립니다.
            </p>

            {/* 상태 선택 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {conditions.map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => setSelectedCondition(condition.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedCondition === condition.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{condition.emoji}</div>
                  <div className="font-medium text-sm">{condition.label}</div>
                </button>
              ))}
            </div>

            {/* 추천 음식 리스트 */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-gray-800 flex items-center">
                <span className="mr-2">{conditions.find(c => c.id === selectedCondition)?.emoji}</span>
                {conditions.find(c => c.id === selectedCondition)?.label}에 좋은 음식
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodRecommendations[selectedCondition]?.map((food, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl bg-gray-50 p-3 rounded-lg">{food.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-bold text-gray-900">{food.name}</h5>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                            {food.nutrients}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {food.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                이 정보는 일반적인 영양 가이드이며, 심각한 증상이 있거나 알레르기가 있는 경우 반드시 전문가와 상담하세요.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}