'use client'

import { useState, useRef, useEffect } from 'react'

interface AIChatProps {
  symptoms: string[]
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function AIChat({ symptoms }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `안녕하세요! 태장고등학교 AI 건강 상담사입니다. 🤖
      
현재 선택하신 증상들을 확인했습니다: ${symptoms.length > 0 ? symptoms.join(', ') : '없음'}

어떤 것에 대해 궁금한 점이 있으신가요? 건강과 관련된 모든 질문에 답변해드릴게요!`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    '두통이 있을 때 어떻게 해야 하나요?',
    '충분한 수면을 위한 팁을 알려주세요',
    '스트레스를 관리하는 방법은?',
    '건강한 식습관에 대해 알려주세요',
    '운동을 시작하려면 어떻게 해야 하나요?'
  ]

  const aiResponses: Record<string, string> = {
    '두통': `두통이 있으실 때는 다음과 같은 방법을 시도해보세요:

🧊 **냉찜질**: 이마나 목 뒤에 차가운 수건을 10-15분간 올려두세요
💧 **충분한 수분 섭취**: 탈수가 두통의 원인일 수 있어요
😴 **충분한 휴식**: 조용하고 어두운 곳에서 휴식을 취하세요
🧘‍♀️ **목과 어깨 마사지**: 긴장으로 인한 두통에 도움이 됩니다

증상이 지속되거나 심해지면 보건선생님께 상담받으시길 권합니다.`,

    '수면': `좋은 수면을 위한 팁을 알려드릴게요:

🌙 **규칙적인 수면 패턴**: 매일 같은 시간에 자고 일어나세요
📱 **디지털 디톡스**: 잠들기 1시간 전부터는 스마트폰 사용을 줄이세요
🛀 **편안한 환경 조성**: 어둡고 시원한 온도(18-22°C)를 유지하세요
☕ **카페인 제한**: 오후 2시 이후로는 카페인 섭취를 피하세요
📚 **수면 의식**: 독서나 명상 같은 진정 활동으로 하루를 마무리하세요

청소년은 8-9시간의 수면이 필요합니다!`,

    '스트레스': `스트레스 관리 방법을 알려드릴게요:

🧘‍♀️ **명상과 심호흡**: 하루 10분씩 명상이나 깊은 호흡 연습을 해보세요
🏃‍♀️ **규칙적인 운동**: 운동은 스트레스 호르몬을 줄이고 기분을 좋게 해줍니다
🎵 **음악 감상**: 좋아하는 음악을 들으며 마음을 진정시키세요
👥 **사회적 지지**: 가족이나 친구들과 대화하며 감정을 나누세요
📝 **일기 쓰기**: 하루의 감정과 생각을 글로 표현해보세요

스트레스가 지속되면 학교 상담교사나 보건선생님께 도움을 요청하세요.`,

    '식습관': `건강한 식습관을 위한 조언입니다:

🥗 **균형 잡힌 식단**: 탄수화물, 단백질, 지방을 적절히 섭취하세요
🍎 **신선한 과일과 채소**: 하루 5회 이상 다양한 색깔의 과일과 채소를 드세요
💧 **충분한 수분**: 하루 8잔 이상의 물을 마시세요
🍟 **가공식품 줄이기**: 인스턴트, 패스트푸드보다는 자연식품을 선택하세요
⏰ **규칙적인 식사**: 하루 3끼를 거르지 말고 규칙적으로 드세요

학교 급식도 영양사가 계획한 균형잡힌 식단이니 꼭 챙겨드세요!`,

    '운동': `운동을 시작하는 방법을 알려드릴게요:

👟 **작게 시작하기**: 하루 10-15분 산책부터 시작해보세요
🎯 **목표 설정**: 주 3회, 30분 운동 같은 구체적인 목표를 세우세요
🤸‍♀️ **다양한 활동**: 걷기, 계단 오르기, 스트레칭, 홈트레이닝 등 다양하게 시도하세요
👥 **함께 하기**: 친구나 가족과 함께 운동하면 더 재미있어요
📱 **운동 앱 활용**: 홈트레이닝 앱이나 운동 영상을 활용해보세요

무리하지 말고 몸의 신호를 들으며 점진적으로 늘려가세요!`
  }

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const [keyword, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(keyword.toLowerCase()) || 
          lowerMessage.includes(keyword)) {
        return response
      }
    }
    
    // 기본 응답
    return `질문해주셔서 감사합니다! 😊

구체적인 증상이나 상황에 대해 더 자세히 말씀해주시면, 더 정확한 조언을 드릴 수 있어요.

다음과 같은 주제에 대해 도움을 드릴 수 있습니다:
• 두통, 복통 등 일반적인 증상 관리
• 수면, 식습관, 운동 관련 조언
• 스트레스 관리 방법
• 건강한 생활습관 형성

언제든지 궁금한 점을 물어보세요!`
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // AI 응답 시뮬레이션 (실제로는 OpenAI API 호출)
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const sendQuickQuestion = (question: string) => {
    setInputMessage(question)
    setTimeout(() => sendMessage(), 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[700px] flex flex-col">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI 건강 상담사</h2>
                <p className="text-blue-100">24시간 언제든지 건강 상담을 받아보세요</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-100">온라인</span>
              <span className="text-blue-100 ml-4">응답 시간: 즉시</span>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-3 max-w-3xl">
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-12'
                        : 'bg-white text-gray-800 mr-12'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
                    <div className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 질문 버튼들 */}
          {messages.length <= 1 && (
            <div className="p-6 bg-white border-t">
              <p className="text-sm text-gray-600 mb-3 font-medium">💡 자주 묻는 질문:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendQuickQuestion(question)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full transition-colors border border-blue-200 hover:border-blue-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="건강에 대해 궁금한 점을 물어보세요..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !inputMessage.trim() || isTyping
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isTyping ? '전송 중...' : '전송'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}