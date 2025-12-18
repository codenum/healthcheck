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
  description: string
  tip: string
  caution?: string
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
    { id: 'cancer', label: '암 예방', emoji: '🛡️' },
    { id: 'allergy', label: '면역/알레르기', emoji: '🌿' },
    { id: 'heart', label: '심혈관 건강', emoji: '❤️' },
    { id: 'diabetes', label: '당뇨 예방', emoji: '📉' },
    { id: 'eye', label: '눈 건강', emoji: '👁️' },
  ]

  const foodRecommendations: Record<string, RecommendedFood[]> = {
    general: [
      { 
        name: '사과', 
        emoji: '🍎', 
        nutrients: '비타민C, 펙틴, 퀘르세틴', 
        description: '수용성 식이섬유인 펙틴이 풍부하여 장내 유익균을 증식시키고 콜레스테롤 배출을 돕습니다. 껍질의 퀘르세틴은 강력한 항산화 작용을 하여 세포 노화를 방지합니다.',
        tip: '깨끗이 씻어 껍질째 드시는 것이 영양 흡수에 가장 좋습니다.'
      },
      { 
        name: '계란', 
        emoji: '🥚', 
        nutrients: '단백질, 비타민D, 레시틴', 
        description: '필수 아미노산이 골고루 함유된 완전 단백질 식품입니다. 노른자의 레시틴은 뇌세포막을 구성하는 주요 성분으로 기억력 향상에 도움을 줍니다.',
        tip: '반숙으로 드시면 소화 흡수율이 가장 높습니다.'
      },
      { 
        name: '토마토', 
        emoji: '🍅', 
        nutrients: '라이코펜, 비타민K, 칼륨', 
        description: '강력한 항산화 물질인 라이코펜이 활성산소를 제거하고 혈관 건강을 지켜줍니다. 가열하면 라이코펜의 체내 흡수율이 더욱 높아집니다.',
        tip: '올리브 오일과 함께 익혀 드시면 흡수율이 5배 이상 증가합니다.'
      },
    ],
    cancer: [
      {
        name: '마늘',
        emoji: '🧄',
        nutrients: '알리신, 셀레늄',
        description: '알리신 성분이 강력한 살균 및 항균 작용을 하며, 암세포의 발생과 전이를 억제합니다. 미국 국립암연구소가 선정한 항암 식품 1위입니다.',
        tip: '다지거나 으깬 후 10분 정도 두면 알리신 활성도가 최대가 됩니다.',
        caution: '공복에 과다 섭취 시 위 점막을 자극할 수 있습니다.'
      },
      {
        name: '버섯',
        emoji: '🍄',
        nutrients: '베타글루칸, 비타민D',
        description: '베타글루칸이 면역 세포인 NK세포를 활성화하여 암세포를 공격하게 합니다. 정상 세포의 손상 없이 암세포 증식을 억제하는 효과가 있습니다.',
        tip: '햇볕에 말려 드시면 비타민D 함량이 더욱 높아집니다.'
      },
      {
        name: '강황(카레)',
        emoji: '🍛',
        nutrients: '커큐민',
        description: '노란색 성분인 커큐민이 종양의 성장을 차단하고 사멸을 유도합니다. 강력한 항염 작용으로 만성 염증을 예방하여 암 발생 위험을 낮춥니다.',
        tip: '후추와 함께 섭취하면 체내 흡수율이 20배까지 증가합니다.'
      }
    ],
    allergy: [
      {
        name: '연어',
        emoji: '🐟',
        nutrients: '오메가-3 지방산',
        description: '오메가-3가 체내 염증 반응을 억제하여 알레르기 증상을 완화합니다. 면역 체계의 과민 반응을 조절하는 데 도움을 줍니다.',
        tip: '껍질 바로 밑에 영양분이 가장 많으므로 껍질째 조리하세요.'
      },
      {
        name: '녹차',
        emoji: '🍵',
        nutrients: '카테킨, 테아닌',
        description: '카테킨 성분이 알레르기를 유발하는 히스타민의 분비를 억제합니다. 항산화 작용으로 호흡기 건강을 지키고 면역력을 높입니다.',
        tip: '80도 정도의 물에 우려내야 떫은맛은 줄고 영양소는 보존됩니다.',
        caution: '카페인이 함유되어 있으므로 민감한 경우 섭취량을 조절하세요.'
      },
      {
        name: '요거트',
        emoji: '🥣',
        nutrients: '프로바이오틱스',
        description: '장내 유익균을 늘려 면역 시스템의 균형을 맞춰줍니다. 면역 세포의 70%가 존재하는 장 건강을 개선하여 알레르기 체질 개선에 도움을 줍니다.',
        tip: '당분이 첨가되지 않은 그릭 요거트가 가장 효과적입니다.'
      }
    ],
    heart: [
      {
        name: '양파',
        emoji: '🧅',
        nutrients: '퀘르세틴, 유화아릴',
        description: '퀘르세틴이 혈관 내 지방을 분해하고 혈전 형성을 막아줍니다. 혈관을 튼튼하게 하고 혈액 순환을 원활하게 하여 고혈압 예방에 좋습니다.',
        tip: '겉껍질에 퀘르세틴이 가장 많으므로 육수 낼 때 껍질째 사용하세요.'
      },
      {
        name: '비트',
        emoji: '🥬',
        nutrients: '질산염, 베타인',
        description: '질산염이 체내에서 산화질소로 바뀌어 혈관을 확장시키고 혈압을 낮춥니다. 베타인 성분은 혈관 손상을 막고 해독 작용을 돕습니다.',
        tip: '영양소 파괴를 막기 위해 15분 이내로 찌는 조리법을 추천합니다.',
        caution: '과다 섭취 시 저혈압이 올 수 있으니 적당량을 드세요.'
      },
      {
        name: '아보카도',
        emoji: '🥑',
        nutrients: '칼륨, 불포화지방산',
        description: '풍부한 칼륨이 나트륨 배출을 돕고, 불포화지방산이 나쁜 콜레스테롤(LDL) 수치를 낮춰 혈관 건강을 지켜줍니다.',
        tip: '레몬즙을 뿌리면 갈변을 막고 비타민 흡수율도 높일 수 있습니다.'
      }
    ],
    diabetes: [
      {
        name: '현미',
        emoji: '🌾',
        nutrients: '식이섬유, 가바(GABA)',
        description: '식이섬유가 당분의 흡수 속도를 늦춰 혈당이 급격히 오르는 것을 막아줍니다. 백미보다 인슐린 분비를 자극하지 않아 당뇨 예방에 필수적입니다.',
        tip: '50번 이상 꼭꼭 씹어야 소화가 잘 되고 영양 흡수가 원활합니다.'
      },
      {
        name: '여주',
        emoji: '🥒',
        nutrients: 'P-인슐린, 카란틴',
        description: '식물성 인슐린이라 불리는 P-인슐린이 포도당이 간에서 연소되도록 돕습니다. 췌장의 기능을 활성화하여 혈당 조절에 탁월합니다.',
        tip: '특유의 쓴맛은 소금물에 10분 정도 담가두면 줄어듭니다.',
        caution: '임산부는 자궁 수축 위험이 있으므로 섭취를 피하세요.'
      },
      {
        name: '식초',
        emoji: '🍶',
        nutrients: '유기산',
        description: '유기산이 탄수화물 소화 효소의 작용을 억제하여 혈당 상승을 완만하게 합니다. 인슐린 감수성을 개선하여 혈당 조절을 돕습니다.',
        tip: '식사 도중이나 직후에 물에 희석해서 드시는 것이 좋습니다.',
        caution: '위산 과다 증상이 있는 경우 속쓰림을 유발할 수 있습니다.'
      }
    ],
    eye: [
      {
        name: '당근',
        emoji: '🥕',
        nutrients: '베타카로틴, 비타민A',
        description: '베타카로틴이 체내에서 비타민A로 전환되어 시력을 보호하고 야맹증을 예방합니다. 눈의 점막을 튼튼하게 하여 안구건조증에도 좋습니다.',
        tip: '지용성 비타민이므로 기름에 볶아 드셔야 흡수율이 높아집니다.'
      },
      {
        name: '결명자',
        emoji: '🫖',
        nutrients: '카로틴, 캠페롤',
        description: '눈의 열을 내려주고 충혈을 완화합니다. 시신경을 보호하고 녹내장, 백내장 등 안구 질환 예방에 도움을 줍니다.',
        tip: '진하게 끓여서 물 대신 수시로 마시면 좋습니다.',
        caution: '혈압을 낮추는 효과가 있어 저혈압 환자는 주의가 필요합니다.'
      }
    ],
    cold: [
      { 
        name: '생강차', 
        emoji: '🍵', 
        nutrients: '진저롤, 쇼가올', 
        description: '매운맛 성분인 진저롤과 쇼가올이 말초 혈관을 확장시켜 체온을 높이고 면역 세포의 활동을 촉진합니다. 강력한 살균 작용으로 호흡기 바이러스 증식을 억제합니다.',
        tip: '꿀을 타서 드시면 목의 건조함을 막는 데 더욱 효과적입니다.',
        caution: '위궤양이 있거나 열이 39도 이상 고열일 때는 섭취를 자제하세요.'
      },
      { 
        name: '배', 
        emoji: '🍐', 
        nutrients: '루테올린, 수분', 
        description: '루테올린 성분이 기관지 점막의 염증을 가라앉히고 가래를 삭이는 거담 작용을 합니다. 풍부한 수분이 열을 내리고 갈증을 해소해줍니다.',
        tip: '도라지와 함께 달여 드시면 기침 완화 효과가 배가됩니다.'
      },
      { 
        name: '유자차', 
        emoji: '🍋', 
        nutrients: '비타민C, 구연산, 리모넨', 
        description: '레몬보다 3배 많은 비타민C가 인터페론 생성을 도와 바이러스 저항력을 높입니다. 껍질의 리모넨 성분은 목의 염증을 완화하고 기침을 진정시킵니다.',
        tip: '껍질까지 모두 섭취해야 유자의 효능을 온전히 누릴 수 있습니다.'
      },
    ],
    stomach: [
      { 
        name: '매실', 
        emoji: '🫒', 
        nutrients: '유기산(구연산, 사과산)', 
        description: '신맛을 내는 유기산이 위장 운동을 촉진하고 소화액 분비를 돕습니다. 피크린산 성분이 독성 물질을 분해하여 식중독 예방에도 효과적입니다.',
        tip: '따뜻한 물에 희석하여 차로 마시면 위장 부담을 줄일 수 있습니다.',
        caution: '위산 과다 분비 시 속쓰림을 유발할 수 있으니 식후에 드세요.'
      },
      { 
        name: '양배추', 
        emoji: '🥬', 
        nutrients: '비타민U, 비타민K', 
        description: '비타민U가 위 점막의 상처를 치료하고 재생을 돕습니다. 비타민K는 위궤양으로 인한 출혈을 지혈하는 작용을 하여 위 건강을 지켜줍니다.',
        tip: '열에 약하므로 생으로 먹거나 살짝만 쪄서 드시는 것이 좋습니다.'
      },
      { 
        name: '무', 
        emoji: '🥕', 
        nutrients: '디아스타아제, 아밀라아제', 
        description: '천연 소화제로 불리는 디아스타아제가 탄수화물을 분해하여 소화를 돕습니다. 식이섬유가 풍부하여 장내 노폐물 배출을 촉진합니다.',
        tip: '껍질에 비타민C가 많으므로 깨끗이 씻어 껍질째 요리하세요.'
      },
    ],
    fatigue: [
      { 
        name: '바나나', 
        emoji: '🍌', 
        nutrients: '비타민B6, 마그네슘, 트립토판', 
        description: '빠르게 에너지로 전환되는 과당과 포도당이 풍부하여 즉각적인 피로 회복을 돕습니다. 마그네슘이 근육의 긴장을 풀고 신경을 안정시켜줍니다.',
        tip: '검은 반점(슈가 스팟)이 생겼을 때 당도와 면역 활성 효과가 가장 높습니다.'
      },
      { 
        name: '아몬드', 
        emoji: '🥜', 
        nutrients: '마그네슘, 비타민E', 
        description: '에너지 대사에 필수적인 마그네슘이 풍부하여 만성 피로를 개선합니다. 강력한 항산화제인 비타민E가 활성산소로부터 세포를 보호합니다.',
        tip: '하루 한 줌(약 23알) 정도가 적당하며, 무염 아몬드를 추천합니다.'
      },
      { 
        name: '브로콜리', 
        emoji: '🥦', 
        nutrients: '비타민C, 설포라판', 
        description: '레몬의 2배에 달하는 비타민C가 피로 물질인 젖산을 분해합니다. 설포라판 성분은 체내 독소를 배출하고 면역력을 강화합니다.',
        tip: '영양소 파괴를 최소화하기 위해 끓는 물에 살짝 데쳐 드세요.'
      },
    ],
    anemia: [
      { 
        name: '시금치', 
        emoji: '🥬', 
        nutrients: '철분, 엽산, 비타민C', 
        description: '적혈구 생성에 필수적인 철분과 엽산이 풍부합니다. 함께 들어있는 비타민C가 식물성 철분의 체내 흡수율을 높여줍니다.',
        tip: '수산 성분이 칼슘 흡수를 방해할 수 있으니 살짝 데쳐서 드세요.'
      },
      { 
        name: '소고기', 
        emoji: '🥩', 
        nutrients: '헴철, 비타민B12, 단백질', 
        description: '체내 흡수율이 높은 동물성 철분(헴철)이 풍부하여 빈혈 개선에 가장 효과적입니다. 비타민B12는 적혈구의 정상적인 발달을 돕습니다.',
        tip: '비타민C가 풍부한 채소와 함께 먹으면 철분 흡수율이 더욱 높아집니다.'
      },
      { 
        name: '미역', 
        emoji: '🌿', 
        nutrients: '철분, 칼슘, 요오드', 
        description: '철분과 엽산이 풍부하여 조혈 작용을 돕고 피를 맑게 합니다. 알긴산 성분은 혈액 순환을 원활하게 하여 빈혈 증상을 완화합니다.',
        tip: '식초를 곁들이면 칼슘과 철분의 흡수율이 높아집니다.'
      },
    ],
    brain: [
      { 
        name: '등푸른 생선', 
        emoji: '🐟', 
        nutrients: '오메가-3(DHA, EPA)', 
        description: '뇌세포막의 주요 성분인 DHA가 뇌 기능을 활성화하고 기억력을 향상시킵니다. EPA는 혈액 순환을 개선하여 뇌로 가는 산소 공급을 원활하게 합니다.',
        tip: '주 2회 이상 섭취를 권장하며, 튀기기보다 찜이나 조림이 좋습니다.'
      },
      { 
        name: '블루베리', 
        emoji: '🫐', 
        nutrients: '안토시아닌, 폴리페놀', 
        description: '강력한 항산화 물질인 안토시아닌이 뇌세포의 노화를 막고 인지 기능을 개선합니다. 뇌 혈류량을 증가시켜 집중력 향상에 도움을 줍니다.',
        tip: '껍질에 안토시아닌이 많으므로 껍질째 생으로 먹거나 갈아 드세요.'
      },
      { 
        name: '호두', 
        emoji: '🌰', 
        nutrients: '알파리놀렌산, 비타민E', 
        description: '뇌신경 세포의 60%를 구성하는 불포화지방산이 풍부합니다. 비타민E가 뇌세포 파괴를 막고 인지 기능 저하를 예방합니다.',
        tip: '산패되기 쉬우므로 밀폐 용기에 담아 냉장 보관하세요.'
      },
    ],
    stress: [
      { 
        name: '다크 초콜릿', 
        emoji: '🍫', 
        nutrients: '폴리페놀, 테오브로민', 
        description: '코르티솔 같은 스트레스 호르몬 분비를 억제합니다. 테오브로민 성분이 대뇌 피질을 부드럽게 자극하여 사고력을 높이고 기분을 좋게 합니다.',
        tip: '카카오 함량 70% 이상인 제품을 하루 1-2조각 섭취하세요.',
        caution: '카페인이 함유되어 있으므로 저녁 늦게 섭취는 피하세요.'
      },
      { 
        name: '우유', 
        emoji: '🥛', 
        nutrients: '트립토판, 칼슘, 마그네슘', 
        description: '필수 아미노산인 트립토판이 행복 호르몬인 세로토닌 생성을 돕습니다. 칼슘과 마그네슘이 신경을 이완시켜 불안감을 해소합니다.',
        tip: '따뜻하게 데워 마시면 심신 안정 효과가 더욱 좋습니다.',
        caution: '유당불내증이 있다면 락토프리 우유나 두유로 대체하세요.'
      },
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
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-gray-900 text-lg">{food.name}</h5>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                            {food.nutrients}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {food.description}
                        </p>
                        <div className="bg-blue-50 p-2.5 rounded-lg text-xs text-blue-800 mb-2">
                          <span className="font-bold mr-1">💡 Tip:</span>
                          {food.tip}
                        </div>
                        {food.caution && (
                          <div className="bg-red-50 p-2.5 rounded-lg text-xs text-red-800 flex items-start">
                            <AlertCircle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-bold mr-1">주의:</span>
                              {food.caution}
                            </span>
                          </div>
                        )}
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