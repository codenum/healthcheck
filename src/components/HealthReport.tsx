'use client'

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// 샘플 데이터
const healthData = [
  { subject: '스트레스', value: 65, fullMark: 100 },
  { subject: '수면의 질', value: 85, fullMark: 100 },
  { subject: '활동량', value: 70, fullMark: 100 },
  { subject: '식습관', value: 80, fullMark: 100 },
  { subject: '학업 집중도', value: 75, fullMark: 100 },
];

const recentDiagnoses = [
  { date: '2025-10-20', result: '경미한 스트레스 및 수면 부족', type: '일반' },
  { date: '2025-10-12', result: '양호', type: '정기' },
  { date: '2025-10-05', result: '활동량 부족 의심', type: '일반' },
];

export default function HealthReport() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">📊 건강 리포트</h2>
        <p className="text-gray-600">
          최근 자가진단 기록을 바탕으로 생성된 개인별 건강 리포트입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 건강 균형 차트 */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">종합 건강 균형</h3>
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="나의 점수" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 오른쪽: 종합 분석 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">종합 분석 및 제안</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">✅ 긍정적 요인</h4>
              <p className="text-sm text-gray-600 mt-1">
                • 수면의 질과 식습관 점수가 높아 안정적인 생활 패턴을 유지하고 있습니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">⚠️ 개선 필요 요인</h4>
              <p className="text-sm text-gray-600 mt-1">
                • 스트레스 지수가 다소 높게 나타나고 있습니다. 명상이나 가벼운 산책으로 스트레스 관리가 필요합니다.
                <br />
                • 활동량이 권장 수준보다 낮습니다. 꾸준한 운동을 통해 체력을 증진시키는 것이 좋습니다.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800">💡 맞춤형 제안</h4>
              <p className="text-sm text-blue-700 mt-1">
                점심시간 후 10분간 친구와 함께 운동장을 산책하며 햇볕을 쬐는 것을 추천합니다. 학업 스트레스 해소와 활동량 증가에 도움이 될 것입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 진단 기록 */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">최근 진단 기록</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">진단일</th>
                <th className="p-3 text-sm font-semibold text-gray-600">종류</th>
                <th className="p-3 text-sm font-semibold text-gray-600">주요 결과</th>
              </tr>
            </thead>
            <tbody>
              {recentDiagnoses.map((diag, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{diag.date}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <span className={`px-2 py-1 text-xs rounded-full ${diag.type === '정기' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {diag.type}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{diag.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
