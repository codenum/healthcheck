'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { Users, CheckCircle, MessageCircle } from 'lucide-react'

interface Stats {
  activeUsers: number;
  diagnosesCompleted: number;
  aiConsultations: number;
}

export default function RealtimeStats() {
  const [stats, setStats] = useState<Stats>({
    activeUsers: 0,
    diagnosesCompleted: 0,
    aiConsultations: 0,
  })

  useEffect(() => {
    const statDocRef = doc(db, "statistics", "main");

    const unsubscribe = onSnapshot(statDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStats({
          activeUsers: data.activeUsers || 0,
          diagnosesCompleted: data.diagnosesCompleted || 0,
          aiConsultations: data.aiConsultations || 0,
        });
      } else {
        console.log("Statistics document does not exist!");
      }
    }, (error) => {
      console.error("Error fetching real-time statistics:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex flex-col items-center justify-center">
        <Users className="text-white/80 mb-2" size={28} />
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stats.activeUsers.toLocaleString()}</div>
        <div className="text-white/80 text-sm md:text-base">활성 사용자</div>
      </div>
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex flex-col items-center justify-center">
        <CheckCircle className="text-white/80 mb-2" size={28} />
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stats.diagnosesCompleted.toLocaleString()}</div>
        <div className="text-white/80 text-sm md:text-base">진단 완료</div>
      </div>
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex flex-col items-center justify-center">
        <MessageCircle className="text-white/80 mb-2" size={28} />
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stats.aiConsultations.toLocaleString()}</div>
        <div className="text-white/80 text-sm md:text-base">AI 상담</div>
      </div>
    </div>
  );
}
