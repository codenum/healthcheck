'use client'

import { useState } from 'react'

interface LoginModalProps {
  onLogin: (name: string) => void
  onClose: () => void
}

export default function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = '학번을 입력해주세요'
    }

    if (isSignUp) {
      if (!formData.email.trim()) {
        newErrors.email = '이메일을 입력해주세요'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다'
      }

      if (!formData.password) {
        newErrors.password = '비밀번호를 입력해주세요'
      } else if (formData.password.length < 6) {
        newErrors.password = '비밀번호는 6자 이상이어야 합니다'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // 간단한 로그인 시뮬레이션
      onLogin(formData.name)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignUp ? '회원가입' : '로그인'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {isSignUp ? '태장고등학교 계정을 만들어보세요' : '태장고등학교 계정으로 로그인하세요'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="홍길동"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* 학번 */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              학번
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.studentId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="20250101"
            />
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>

          {/* 회원가입 추가 필드들 */}
          {isSignUp && (
            <>
              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="student@taejang.hs.kr"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="6자 이상 입력하세요"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            {isSignUp ? '회원가입하기' : '로그인하기'}
          </button>

          {/* 전환 버튼 */}
          <div className="text-center pt-4">
            <p className="text-gray-600">
              {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setFormData({
                    name: '',
                    studentId: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  })
                  setErrors({})
                }}
                className="text-blue-600 hover:text-blue-700 font-medium ml-2"
              >
                {isSignUp ? '로그인하기' : '회원가입하기'}
              </button>
            </p>
          </div>
        </form>

        {/* Demo 안내 */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              💡 <strong>데모 버전:</strong> 아무 이름과 학번으로도 로그인 가능합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}