interface HeaderProps {
  onBack?: () => void
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏥</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">내 손안의 보건실</h1>
              <p className="text-sm text-gray-500">태장고등학교</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="btn-secondary">로그인</button>
          <button className="btn-primary">회원가입</button>
        </div>
      </div>
    </header>
  )
}