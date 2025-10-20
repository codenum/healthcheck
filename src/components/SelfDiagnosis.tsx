'use client'

import { useState } from 'react'

interface SelfDiagnosisProps {
  onComplete: (symptoms: string[], recommendedType: string) => void
}

const symptomsList = [
  // 1. 호흡기 건강
  { id: 'cough', label: '기침이 자주 나온다', category: 'respiratory' },
  { id: 'sore_throat', label: '목이 아프거나 따끔거린다', category: 'respiratory' },
  { id: 'runny_nose', label: '콧물이 나거나 코가 막힌다', category: 'respiratory' },
  // 2. 소화기 건강
  { id: 'stomachache', label: '복통, 속쓰림, 더부룩함이 있다', category: 'digestive' },
  { id: 'indigestion', label: '소화가 잘 안되고 가스가 찬다', category: 'digestive' },
  { id: 'loss_of_appetite', label: '식욕이 없다', category: 'digestive' },
  // 3. 피로/수면
  { id: 'fatigue', label: '쉽게 피로하고 지친다', category: 'fatigue' },
  { id: 'poor_sleep', label: '수면의 질이 좋지 않다 (자주 깸, 아침에 개운하지 않음)', category: 'fatigue' },
  { id: 'lack_of_concentration', label: '집중력이 떨어지고 멍하다', category: 'fatigue' },
  // 4. 식습관
  { id: 'irregular_meals', label: '식사 시간이 불규칙하다', category: 'eating' },
  { id: 'late_night_snack', label: '야식이나 폭식을 자주 한다', category: 'eating' },
  { id: 'unbalanced_diet', label: '인스턴트, 단 음식 위주로 식사한다', category: 'eating' },
  // 5. 운동 부족
  { id: 'low_activity', label: '하루 대부분을 앉아서 보낸다', category: 'exercise' },
  { id: 'no_regular_exercise', label: '정기적인 운동을 전혀 하지 않는다', category: 'exercise' },
  { id: 'feel_heavy', label: '몸이 무겁고 찌뿌둥하다', category: 'exercise' },
  // 6. 정신건강
  { id: 'anxiety', label: '불안하거나 초조함을 자주 느낀다', category: 'mental' },
  { id: 'depressed', label: '기분이 우울하고 무기력하다', category: 'mental' },
  { id: 'high_stress', label: '학업, 대인관계 등 스트레스가 심하다', category: 'mental' },
  // 7. 체중관리
  { id: 'sudden_weight_change', label: '최근 급격한 체중 변화가 있었다', category: 'weight' },
  { id: 'weight_satisfaction', label: '현재 체중에 만족하지 않는다', category: 'weight' },
  { id: 'difficulty_in_control', label: '체중 조절에 어려움을 겪는다', category: 'weight' },
  // 8. 피부건강
  { id: 'acne', label: '여드름, 뾰루지 등 피부 트러블이 잦다', category: 'skin' },
  { id: 'itchiness_dryness', label: '피부가 가렵거나 건조하다', category: 'skin' },
  { id: 'dull_skin_tone', label: '피부 톤이 칙칙하고 푸석하다', category: 'skin' },
  // 9. 면역력
  { id: 'frequent_cold', label: '감기에 자주 걸린다', category: 'immunity' },
  { id: 'slow_recovery', label: '상처나 질병의 회복이 더디다', category: 'immunity' },
  { id: 'chronic_fatigue', label: '피로가 잘 풀리지 않고 누적된다', category: 'immunity' },
  // 10. 기타 증상
  { id: 'headache', label: '두통이 자주 있다', category: 'other' },
  { id: 'dizziness', label: '어지럼증을 느낀다', category: 'other' },
  { id: 'etc_symptom', label: '설명하기 어려운 다른 불편한 증상이 있다', category: 'other' },
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
    if (selectedSymptoms.length === 0) return;

    const recommendedType = getRecommendedTypeText(true) as string;
    setShowResult(true);
    setTimeout(() => {
      onComplete(selectedSymptoms, recommendedType);
    }, 2000);
  }

  const getRecommendedTypeText = (returnId = false) => {
    if (selectedSymptoms.length === 0) {
      return returnId ? 'general' : { type: '...', description: '...' };
    }

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
      case 'respiratory':
        return returnId ? 'respiratory' : { type: '1️⃣ 감기형', description: '호흡기 건강에 주의가 필요합니다. 충분한 휴식과 수분 섭취를 권장합니다.' };
      case 'digestive':
        return returnId ? 'digestive' : { type: '2️⃣ 소화불량형', description: '소화기 건강 관리가 필요합니다. 규칙적인 식사와 자극적이지 않은 음식을 드세요.' };
      case 'fatigue':
        return returnId ? 'fatigue' : { type: '3️⃣ 수면 부족형', description: '만성 피로와 수면 부족이 의심됩니다. 규칙적인 수면 습관을 가져보세요.' };
      case 'eating':
        return returnId ? 'eating' : { type: '4️⃣ 식습관 불균형형', description: '불규칙한 식습관 개선이 시급합니다. 영양가 있는 식사를 규칙적으로 하세요.' };
      case 'exercise':
        return returnId ? 'exercise' : { type: '5️⃣ 운동 부족형', description: '신체 활동량을 늘려야 합니다. 가벼운 스트레칭이나 걷기부터 시작해보세요.' };
      case 'mental':
        return returnId ? 'mental' : { type: '6️⃣ 스트레스 관리형', description: '정신 건강에 관심을 가져야 할 때입니다. 명상이나 취미 활동을 추천합니다.' };
      case 'weight':
        return returnId ? 'weight' : { type: '7️⃣ 체중 관리형', description: '체계적인 체중 관리가 필요합니다. 전문가와 상담을 고려해보세요.' };
      case 'skin':
        return returnId ? 'skin' : { type: '8️⃣ 피부 관리형', description: '피부 건강을 위한 관리가 필요합니다. 충분한 수분 섭취와 청결 유지가 중요합니다.' };
      case 'immunity':
        return returnId ? 'immunity' : { type: '9️⃣ 면역 저하형', description: '면역력 증진이 필요합니다. 균형 잡힌 식사와 충분한 휴식을 취하세요.' };
      case 'other':
        return returnId ? 'other' : { type: '🔟 종합 점검형', description: '전반적인 건강 상태 점검이 필요합니다. 보건실에 방문하여 상담받는 것을 권장합니다.' };
      default:
        return returnId ? 'general' : { type: '🏥 종합 관리형', description: '전반적인 건강 관리가 필요합니다.' };
    }
  }

  if (showResult) {
    const result = getRecommendedTypeText() as { type: string; description: string; };
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
              <span className="text-sm">{selectedSymptoms.length}/{symptomsList.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(selectedSymptoms.length / symptomsList.length) * 100}%` }}
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