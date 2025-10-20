'use client'

import { useState } from 'react'

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

export default function DietManagement({ symptoms }: DietManagementProps) {
  const [selectedMeal, setSelectedMeal] = useState('breakfast')
  const [foodLog, setFoodLog] = useState<FoodItem[]>([])
  const [newFood, setNewFood] = useState('')

  const meals = [
    { id: 'breakfast', label: '아침', emoji: '🌅' },
    { id: 'lunch', label: '점심', emoji: '☀️' },
    { id: 'dinner', label: '저녁', emoji: '🌙' },
    { id: 'snack', label: '간식', emoji: '🍎' }
  ]

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
    </div>
  )
}