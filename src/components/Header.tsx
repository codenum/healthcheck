interface HeaderProps {
  onBack?: () => void
  isLoggedIn?: boolean
  userName?: string
  onLogin?: () => void
  onLogout?: () => void
}

export default function Header({ onBack, isLoggedIn = false, userName = '', onLogin, onLogout }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="뒤로가기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🏥</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-800 text-lg">내 손안의 보건실</h1>
                <p className="text-sm text-gray-500">태장고등학교</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userName}님</p>
                    <p className="text-xs text-gray-500">환영합니다!</p>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={onLogin}
                  className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                  로그인
                </button>
                <button 
                  onClick={onLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}