# 🏥 내 손안의 보건실 (Survey)

**태장고등학교 디지털 헬스케어 플랫폼**

## 📋 프로젝트 개요

"내 손안의 보건실"은 학교 보건실 기능을 온라인화하여, 학생의 건강 상태를 자가 진단부터 데이터 분석, 의약품 제공, AI 상담까지 연결하는 스마트 헬스케어 플랫폼입니다.

### 🎯 주요 기능

- **🧾 자가 진단 체크리스트**: 증상 기반 맞춤형 건강 분석
- **💤 수면 관리**: 수면 패턴 분석 및 개선 제안
- **🍱 식단 관리**: 영양소 추적 및 급식 정보 제공
- **🏃 운동 관리**: 홈트레이닝 영상 추천 및 운동 목표 관리
- **🤖 AI 1:1 상담**: 24시간 건강 상담 서비스
- **💊 의약품 관리**: 증상 기반 의약품 추천 및 처방 시스템

### 🏫 대상 사용자

- 태장고등학교 재학생
- 보건교사 및 학교 관리자

## 🛠️ 기술 스택

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Functions (예정)
- **Database**: Firebase Firestore (예정)
- **Authentication**: Firebase Auth (예정)
- **External APIs**: OpenAI, YouTube, SMS 서비스 (예정)

## 🚀 설치 및 실행

### 개발 환경 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### 개발 서버 접속

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인 가능합니다.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── AIChat.tsx         # AI 상담 컴포넌트
│   ├── Header.tsx         # 헤더 컴포넌트
│   ├── HealthManagement.tsx # 건강 관리 메인
│   ├── SelfDiagnosis.tsx  # 자가 진단
│   └── management/        # 관리 모듈들
│       ├── DietManagement.tsx     # 식단 관리
│       ├── ExerciseManagement.tsx # 운동 관리
│       ├── GeneralManagement.tsx  # 종합 관리
│       └── SleepManagement.tsx    # 수면 관리
```

## 🎨 주요 화면

### 홈화면
- 자가 진단 체크리스트
- AI 1:1 상담 버튼
- 건강 관리 현황 대시보드

### 건강 관리 모듈
- **수면 관리**: 수면 패턴 분석, 명상 음악, AI 추천
- **식단 관리**: 영양소 차트, 급식 정보, 식단 기록
- **운동 관리**: 홈트레이닝 영상, 운동 목표 설정
- **종합 관리**: 의약품 처방, 건강 팁, 응급 연락처

### AI 상담
- 24시간 건강 상담 챗봇
- 증상 기반 맞춤 조언
- 빠른 질문 템플릿

## 🔮 향후 개발 계획

### Phase 1 (완료)
- [x] 기본 UI/UX 구현
- [x] 자가 진단 시스템
- [x] 건강 관리 모듈들
- [x] AI 상담 인터페이스

### Phase 2 (예정)
- [ ] Firebase 연동 (인증, 데이터베이스)
- [ ] 실제 OpenAI API 연동
- [ ] 보건교사 관리자 대시보드
- [ ] SMS 알림 시스템

### Phase 3 (예정)
- [ ] 무인 의약품 자판기 연동
- [ ] 웨어러블 디바이스 데이터 연동
- [ ] 고급 데이터 분석 및 리포트

## 🌐 배포

### GitHub Pages
프로젝트는 GitHub Pages를 통해 배포됩니다.

```bash
# 정적 빌드 생성
npm run build

# out 폴더가 생성되어 GitHub Pages에 배포됩니다
```

### 배포 URL
https://choiyousin.github.io/Survey

## 🔧 개발 가이드라인

- Korean language for UI text where appropriate
- Responsive design with Tailwind CSS
- Follow Firebase best practices for security
- Maintain clean component structure
- Focus on user-friendly health management features

## 📄 라이선스

This project is private and intended for educational use at Taejang High School.

## 👥 기여자

- 개발팀: GitHub Copilot을 활용한 AI 보조 개발

## 📞 문의

프로젝트 관련 문의는 GitHub Issues를 통해 해주세요.

---

**🏥 건강한 학교생활을 위한 첫걸음, "내 손안의 보건실"과 함께하세요!**