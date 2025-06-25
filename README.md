# 🖥️ Web DOSBox

웹에서 DOSBox를 실행하여 클래식 DOS 프로그램과 게임을 즐길 수 있는 웹 애플리케이션입니다.

## 🎮 주요 기능

- **웹 DOSBox 에뮬레이터**: js-dos 라이브러리를 사용한 브라우저 내 DOSBox 실행
- **파일 업로드**: .jsdos 또는 .zip 파일을 업로드하여 DOS 프로그램 실행
- **샘플 게임**: 디거(Digger) 게임이 기본으로 제공됨
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **직관적 UI**: 간단한 클릭으로 DOSBox 실행

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **DOSBox**: js-dos 라이브러리
- **스타일링**: CSS3 (Gradient, Flexbox)
- **배포**: nginx (정적 파일 서빙)

## 📂 프로젝트 구조

```
dosbox/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # 메인 DOSBox 컴포넌트
│   │   ├── App.css          # 스타일링
│   │   └── main.jsx         # React 진입점
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js       # Vite 빌드 설정
└── README.md
```

## 🚀 설치 및 실행

### 개발 환경 설정
```bash
cd dosbox/frontend
npm install
npm run dev
```

### 프로덕션 빌드
```bash
cd dosbox/frontend
npm run build
```

## 🎯 사용 방법

1. **샘플 게임 실행**: "DOSBox 시작" 버튼을 클릭하면 디거 게임이 실행됩니다
2. **커스텀 프로그램**: .jsdos 또는 .zip 파일을 업로드하여 실행
3. **키보드 조작**: 캔버스를 클릭한 후 키보드로 조작
4. **전체화면**: F11 키로 전체화면 모드 전환

## 📦 지원 파일 형식

- **.jsdos**: js-dos 전용 게임/프로그램 패키지
- **.zip**: DOS 프로그램이 포함된 압축 파일

## 🔧 배포 설정

### nginx 설정 예시
```nginx
location /dosbox/ {
    root /home/purestory/dosbox/frontend/dist;
    try_files $uri $uri/ /index.html;
    
    # WASM 파일 처리
    location ~* \.(wasm)$ {
        add_header Content-Type application/wasm;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🎮 게임 추가 방법

1. DOS 게임을 .jsdos 형식으로 변환
2. 또는 DOS 게임 폴더를 .zip으로 압축
3. 웹 인터페이스에서 파일 업로드
4. 자동으로 DOSBox에서 실행

## 🔍 디버깅

### 브라우저 개발자 도구 확인
- Console 탭에서 JavaScript 에러 확인
- Network 탭에서 파일 로딩 상태 확인

### 일반적인 문제 해결
- **게임이 실행되지 않는 경우**: 브라우저의 CORS 정책 확인
- **파일 업로드 실패**: 파일 형식과 크기 확인
- **성능 문제**: 브라우저의 WebAssembly 지원 확인

## 📄 라이선스

이 프로젝트는 개인 사용 목적으로 제작되었습니다. js-dos 라이브러리의 라이선스를 준수합니다.

## 🤝 기여

개선사항이나 버그 리포트는 언제든 환영합니다!

---

**⚠️ 주의사항**: 저작권이 있는 DOS 게임을 업로드할 때는 법적 문제가 없는지 확인하세요. 