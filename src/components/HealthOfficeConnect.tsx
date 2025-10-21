'use client'

import React, { useState } from 'react';

export default function HealthOfficeConnect() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'nurse', text: '안녕하세요! 태장고등학교 보건실입니다. 무엇을 도와드릴까요?' }
  ]);
  const [isNurseOnline, setIsNurseOnline] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    setChatHistory([...chatHistory, { sender: 'student', text: message }]);
    setMessage('');

    // AI 간호사 응답 시뮬레이션
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'nurse', text: '네, 확인했습니다. 잠시만 기다려주세요.' }]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">🏥 보건실 연결</h2>
        <p className="text-gray-600">
          보건 선생님과 실시간으로 소통하거나 방문 예약을 할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 실시간 채팅 */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800">실시간 상담</h3>
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${isNurseOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-sm text-gray-600">{isNurseOnline ? '온라인' : '오프라인'}</span>
            </div>
          </div>
          
          <div className="flex-grow space-y-4 overflow-y-auto h-80 pr-2 mb-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${chat.sender === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {chat.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isNurseOnline}
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!isNurseOnline}
            >
              전송
            </button>
          </form>
        </div>

        {/* 오른쪽: 방문 예약 및 기타 기능 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">기타 기능</h3>
          <div className="space-y-4">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              📅 보건실 방문 예약
            </button>
            <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
              📋 자주 묻는 질문 (FAQ)
            </button>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-gray-800">보건실 운영 시간</h4>
              <p className="text-sm text-gray-600 mt-1">평일 09:00 ~ 17:00</p>
              <h4 className="font-semibold text-gray-800 mt-3">긴급 연락처</h4>
              <p className="text-sm text-gray-600 mt-1">031-123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}