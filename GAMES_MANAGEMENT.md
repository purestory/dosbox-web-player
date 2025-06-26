# 🎮 게임 파일 관리 가이드

## 📁 폴더 구조

현재 프로젝트는 콘솔별로 게임 파일을 체계적으로 관리합니다:

```
frontend/public/games/
├── snes/           # Super Nintendo 게임들
├── nes/            # Nintendo Entertainment System 게임들
├── gameboy/        # Game Boy/Game Boy Color 게임들
├── gba/            # Game Boy Advance 게임들
├── n64/            # Nintendo 64 게임들
├── genesis/        # Sega Genesis/Mega Drive 게임들
├── mastersystem/   # Sega Master System 게임들
├── gamegear/       # Game Gear 게임들
├── psx/            # PlayStation 1 게임들
├── psp/            # PlayStation Portable 게임들
├── arcade/         # Arcade 게임들 (MAME/FBNeo)
├── atari2600/      # Atari 2600 게임들
└── dos/            # DOS 게임들
```

## 🎯 현재 사용 가능한 게임들

### SNES (Super Nintendo)
- **라이온 킹** (`lionk.smc`) - 디즈니의 라이온 킹 정품 롬파일

### DOS Games
- **대항해시대 2** (`water2v1.08.zip`) - 코에이의 명작 항해 시뮬레이션
- **페르시아의 왕자** (`Prince of Persia (Fixed).zip`) - 전설적인 액션 플랫폼
- **마리오** (`mario.zip`) - DOS 버전 마리오 게임
- **팩맨 1** (`pm1.zip`) - 클래식 아케이드 게임
- **팩맨 2** (`pm2.zip`) - 팩맨 시리즈

## 🔧 새 게임 추가 방법

### 1단계: 롤파일 업로드
해당 콘솔 폴더에 롬파일을 업로드합니다:
```bash
# 예시: SNES 게임 추가
cp your-game.smc frontend/public/games/snes/
```

### 2단계: GameConfig 업데이트
`frontend/src/types/GameConfig.ts`의 `gameSettings` 배열에 새 게임 추가:

```typescript
{
  id: 'your-game-id',
  name: "게임 이름",
  version: "버전",
  console: 'snes', // 콘솔 ID
  core: 'snes9x',  // 에뮬레이터 코어
  gameFile: "your-game.smc",
  gamePath: "games/snes/your-game.smc",
  description: "게임 설명"
}
```

## 📋 지원하는 파일 형식

### Nintendo 시스템
- **SNES**: `.smc`, `.sfc`, `.fig`
- **NES**: `.nes`
- **Game Boy**: `.gb`, `.gbc`
- **GBA**: `.gba`
- **N64**: `.n64`, `.z64`, `.v64`

### Sega 시스템
- **Genesis**: `.md`, `.gen`, `.bin`
- **Master System**: `.sms`
- **Game Gear**: `.gg`

### 기타 시스템
- **PlayStation**: `.bin`, `.cue`, `.pbp`, `.chd`
- **PSP**: `.iso`, `.cso`
- **Arcade**: `.zip` (MAME 롬)
- **Atari 2600**: `.a26`, `.bin`
- **DOS**: `.zip`, `.exe`, `.bat`

## 🚀 추천 콘솔별 인기 게임

### SNES 추천 롬파일
- 슈퍼 마리오 월드
- 젤다의 전설: 신들의 트라이포스
- 슈퍼 메트로이드
- 파이널 판타지 6

### GBA 추천 롬파일
- 포켓몬 시리즈 (루비/사파이어/에메랄드)
- 젤다의 전설: 바람의 지휘봉
- 메트로이드: 퓨전
- 파이어 엠블렘

### PlayStation 추천 롬파일
- 파이널 판타지 7
- 메탈기어 솔리드
- 크래시 반디쿳 시리즈
- 스파이로 시리즈

## ⚠️ 주의사항

1. **저작권**: 본인이 소유한 게임의 백업 롬파일만 사용하세요
2. **파일 크기**: 대용량 게임은 로딩 시간이 길어질 수 있습니다
3. **호환성**: 모든 롬파일이 100% 호환되지 않을 수 있습니다
4. **성능**: 브라우저 성능에 따라 게임 실행 속도가 달라질 수 있습니다

## 🔄 캐싱 시스템

프로젝트는 고급 캐싱 시스템을 사용하여:
- ✅ 첫 로딩 후 오프라인 플레이 지원
- ✅ 90% 이상 로딩 속도 향상 (재로딩 시)
- ✅ IndexedDB 기반 안정적 저장
- ✅ LRU 방식 자동 캐시 관리 (500MB 제한)

## 📞 지원

게임 추가나 문제 발생 시:
1. 콘솔별 지원 형식 확인
2. 올바른 폴더에 파일 위치 확인  
3. GameConfig 설정 검증
4. 브라우저 콘솔에서 에러 메시지 확인 