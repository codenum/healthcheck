'use client'

import { useState } from 'react'

interface GeneralManagementProps {
  symptoms: string[]
}

interface MedicineRecommendation {
  name: string
  description: string
  dosage: string
  status: 'pending' | 'approved' | 'dispensed'
}

export default function GeneralManagement({ symptoms }: GeneralManagementProps) {
  const [healthScore, setHealthScore] = useState(85)
  const [medicineRequests, setMedicineRequests] = useState<MedicineRecommendation[]>([
    {
      name: '진해제',
      description: '기침 완화를 위한 시럽형 의약품',
      dosage: '1일 3회, 1회 5ml',
      status: 'approved'
    },
    {
      name: '소화제',
      description: '복통 및 소화불량 완화',
      dosage: '1일 2회, 식후 복용',
      status: 'pending'
    }
  ])
  const [showMedicineModal, setShowMedicineModal] = useState(false)

  const healthTips = [
    {
      category: '수분 섭취',
      tip: '하루에 8잔 이상의 물을 마시세요',
      icon: '💧'
    },
    {
      category: '규칙적인 식사',
      tip: '세끼 식사를 거르지 말고 규칙적으로 섭취하세요',
      icon: '🍽️'
    },
    {
      category: '충분한 수면',
      tip: '밤 11시 이전에 잠자리에 들어 8시간 이상 수면을 취하세요',
      icon: '😴'
    },
    {
      category: '스트레스 관리',
      tip: '명상이나 취미활동으로 스트레스를 관리하세요',
      icon: '🧘‍♀️'
    }
  ]

  const upcomingAppointments = [
    {
      date: '2025-10-25',
      time: '14:00',
      type: '건강검진',
      location: '학교 보건실'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'dispensed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '승인됨'
      case 'pending':
        return '승인 대기'
      case 'dispensed':
        return '처방됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="space-y-6">
      {/* 종합 건강 점수 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏥 종합 건강 점수</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64" cy="64" r="56"
                stroke="#e5e7eb" strokeWidth="8" fill="none"
              />
              <circle
                cx="64" cy="64" r="56"
                stroke={healthScore >= 80 ? "#10b981" : healthScore >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8" fill="none"
                strokeDasharray={`${(healthScore / 100) * 351.9} 351.9`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">{healthScore}</span>
              <span className="text-sm text-gray-600">점</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800 mb-2">
            {healthScore >= 80 ? '우수한 건강 상태입니다!' : 
             healthScore >= 60 ? '보통 건강 상태입니다.' : 
             '건강 관리가 필요합니다.'}
          </p>
          <p className="text-sm text-gray-600">
            지속적인 관리로 더 나은 건강을 유지하세요.
          </p>
        </div>
      </div>

      {/* 의약품 처방 현황 */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">💊 의약품 처방 현황</h3>
          <button 
            onClick={() => setShowMedicineModal(true)}
            className="btn-primary text-sm"
          >
            처방 요청
          </button>
        </div>
        
        {medicineRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">현재 처방된 의약품이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {medicineRequests.map((medicine, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(medicine.status)}`}>
                    {getStatusText(medicine.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{medicine.description}</p>
                <p className="text-xs text-gray-500">복용법: {medicine.dosage}</p>
                
                {medicine.status === 'approved' && (
                  <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm text-green-800 font-medium">📱 SMS 발송됨</p>
                    <p className="text-xs text-green-600 mt-1">
                      보건실 무인 자판기에서 학생증으로 수령 가능합니다.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 건강 관리 팁 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 건강 관리 팁</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTips.map((tip, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{tip.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">{tip.category}</h4>
                  <p className="text-sm text-gray-600">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 예정된 검진 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 예정된 검진</h3>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">예정된 검진이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{appointment.type}</h4>
                  <p className="text-sm text-gray-600">{appointment.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 보건교사 연락처 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📞 응급상황 연락처</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div>
              <h4 className="font-medium text-red-800">학교 보건실</h4>
              <p className="text-sm text-red-600">응급상황 시 즉시 연락</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
              📞 연락하기
            </button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h4 className="font-medium text-blue-800">보건교사 (김선생님)</h4>
              <p className="text-sm text-blue-600">건강 상담 및 처방</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
              💬 상담하기
            </button>
          </div>
        </div>
      </div>

      {/* 의약품 처방 요청 모달 */}
      {showMedicineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">의약품 처방 요청</h3>
            <p className="text-sm text-gray-600 mb-4">
              현재 증상에 따라 적절한 의약품을 추천해드립니다. 
              보건선생님의 승인 후 처방됩니다.
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-3 border border-gray-200 rounded">
                <p className="text-sm font-medium text-gray-800">선택된 증상:</p>
                <p className="text-sm text-gray-600">
                  {symptoms.length > 0 ? symptoms.join(', ') : '선택된 증상이 없습니다'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowMedicineModal(false)}
                className="flex-1 btn-secondary"
              >
                취소
              </button>
              <button 
                onClick={() => {
                  setShowMedicineModal(false)
                  // 실제로는 여기서 Firebase에 요청을 저장
                }}
                className="flex-1 btn-primary"
              >
                요청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}