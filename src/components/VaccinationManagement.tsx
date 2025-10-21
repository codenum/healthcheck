'use client'

import React from 'react';

// 샘플 데이터
const vaccinationData = [
  { name: '파상풍/디프테리아(Td)', date: '2022-03-15', status: '완료', hospital: '태장소아과' },
  { name: '일본뇌염', date: '2022-05-20', status: '완료', hospital: '미래이비인후과' },
  { name: '사람유두종바이러스(HPV)', date: '2023-08-10', status: '2차 완료', hospital: '연세산부인과' },
  { name: '인플루엔자(독감)', date: '2025-09-28', status: '완료', hospital: '튼튼내과' },
];

const recommendedVaccinations = [
  { name: 'A형 간염', reason: '항체 미형성 시 권장' },
  { name: '수막구균', reason: '기숙사 생활 등 단체 생활 시 권장' },
];

export default function VaccinationManagement() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">💉 예방접종 관리</h2>
        <p className="text-gray-600">
          학생의 예방접종 기록을 확인하고, 필요한 접종에 대한 안내를 받으세요.
        </p>
      </div>

      {/* 예방접종 기록 테이블 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">나의 예방접종 기록</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">백신명</th>
                <th className="p-3 text-sm font-semibold text-gray-600">접종일</th>
                <th className="p-3 text-sm font-semibold text-gray-600">상태</th>
                <th className="p-3 text-sm font-semibold text-gray-600">접종기관</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationData.map((v, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-bold text-gray-800">{v.name}</td>
                  <td className="p-3 text-sm text-gray-700">{v.date}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{v.hospital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button className="text-sm text-blue-600 hover:underline">전체 기록 보기 &rarr;</button>
        </div>
      </div>

      {/* 권장 예방접종 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">권장 예방접종 안내</h3>
        <div className="space-y-4">
          {recommendedVaccinations.map((rec, index) => (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-blue-800">{rec.name}</h4>
              <p className="text-sm text-blue-700 mt-1">{rec.reason}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          ※ 권장 예방접종은 개인의 건강 상태 및 과거 병력에 따라 달라질 수 있으므로, 접종 전 반드시 의사와 상담하세요.
        </p>
      </div>
    </div>
  );
}