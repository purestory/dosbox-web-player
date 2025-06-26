export interface GameConfig {
  id: string;
  name: string;
  version: string;
  console: string;
  core: string;
  gameFile: string;
  gamePath: string;
  description?: string;
  screenshot?: string;
  fileExtensions?: string[];
}

export interface ConsoleConfig {
  id: string;
  name: string;
  folder: string;
  cores: string[];
  fileExtensions: string[];
  description: string;
  icon?: string;
}

// 지원하는 콘솔 설정
export const consoleConfigs: ConsoleConfig[] = [
  {
    id: 'snes',
    name: 'Super Nintendo',
    folder: 'snes',
    cores: ['snes9x'],
    fileExtensions: ['.smc', '.sfc', '.fig', '.zip'],
    description: 'Super Nintendo Entertainment System',
    icon: '🎮'
  },
  {
    id: 'nes',
    name: 'Nintendo Entertainment System',
    folder: 'nes',
    cores: ['fceumm', 'nestopia'],
    fileExtensions: ['.nes'],
    description: 'Nintendo Entertainment System / Famicom',
    icon: '🕹️'
  },
  {
    id: 'gameboy',
    name: 'Game Boy/Game Boy Color',
    folder: 'gameboy',
    cores: ['gambatte'],
    fileExtensions: ['.gb', '.gbc'],
    description: 'Nintendo Game Boy and Game Boy Color',
    icon: '📱'
  },
  {
    id: 'gba',
    name: 'Game Boy Advance',
    folder: 'gba',
    cores: ['mgba'],
    fileExtensions: ['.gba'],
    description: 'Nintendo Game Boy Advance',
    icon: '🎯'
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    folder: 'n64',
    cores: ['mupen64plus_next', 'parallel-n64'],
    fileExtensions: ['.n64', '.z64', '.v64'],
    description: 'Nintendo 64',
    icon: '🎲'
  },
  {
    id: 'genesis',
    name: 'Sega Genesis',
    folder: 'genesis',
    cores: ['genesis_plus_gx'],
    fileExtensions: ['.md', '.gen', '.bin'],
    description: 'Sega Genesis / Mega Drive',
    icon: '🦔'
  },
  {
    id: 'mastersystem',
    name: 'Sega Master System',
    folder: 'mastersystem',
    cores: ['genesis_plus_gx', 'smsplus'],
    fileExtensions: ['.sms'],
    description: 'Sega Master System',
    icon: '🎪'
  },
  {
    id: 'gamegear',
    name: 'Game Gear',
    folder: 'gamegear',
    cores: ['genesis_plus_gx'],
    fileExtensions: ['.gg'],
    description: 'Sega Game Gear',
    icon: '🎮'
  },
  {
    id: 'psx',
    name: 'PlayStation',
    folder: 'psx',
    cores: ['pcsx_rearmed', 'mednafen_psx_hw'],
    fileExtensions: ['.bin', '.cue', '.pbp', '.chd'],
    description: 'Sony PlayStation',
    icon: '🎯'
  },
  {
    id: 'psp',
    name: 'PlayStation Portable',
    folder: 'psp',
    cores: ['ppsspp'],
    fileExtensions: ['.iso', '.cso'],
    description: 'Sony PlayStation Portable',
    icon: '📺'
  },
  {
    id: 'arcade',
    name: 'Arcade',
    folder: 'arcade',
    cores: ['fbneo', 'mame2003_plus'],
    fileExtensions: ['.zip'],
    description: 'Arcade Games (MAME/FBNeo)',
    icon: '🕹️'
  },
  {
    id: 'atari2600',
    name: 'Atari 2600',
    folder: 'atari2600',
    cores: ['stella2014'],
    fileExtensions: ['.a26', '.bin'],
    description: 'Atari 2600',
    icon: '👾'
  },
  {
    id: 'dos',
    name: 'DOS Games',
    folder: 'dos',
    cores: ['dosbox'],
    fileExtensions: ['.zip', '.exe', '.bat'],
    description: 'MS-DOS Games',
    icon: '💻'
  }
];

// 현재 사용 가능한 게임들
export const gameSettings: GameConfig[] = [
  {
    id: 'lionk-snes',
    name: "라이온 킹",
    version: "1994",
    console: 'snes',
    core: 'snes9x',
    gameFile: "lionk.smc",
    gamePath: "games/snes/lionk.smc",
    description: "디즈니의 라이온 킹 SNES 버전 - 정품 롬파일"
  },
  {
    id: 'mario-allstars-snes',
    name: "슈퍼 마리오 올스타즈 + 슈퍼 마리오 월드",
    version: "1993",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Super Mario All-Stars + Super Mario World (USA).sfc",
    gamePath: "games/snes/Super Mario All-Stars + Super Mario World (USA).sfc",
    description: "닌텐도의 명작 마리오 시리즈 합본팩"
  },

  {
    id: 'water2-dos',
    name: "대항해시대 2",
    version: "1.08",
    console: 'dos',
    core: 'dosbox',
    gameFile: "water2v1.08.zip",
    gamePath: "games/dos/water2v1.08.zip",
    description: "코에이의 명작 항해 시뮬레이션 게임"
  },
  {
    id: 'pop-dos',
    name: "페르시아의 왕자",
    version: "Fixed",
    console: 'dos',
    core: 'dosbox',
    gameFile: "Prince of Persia (Fixed).zip",
    gamePath: "games/dos/Prince of Persia (Fixed).zip",
    description: "전설적인 액션 플랫폼 게임"
  },
  {
    id: 'mario-dos',
    name: "마리오",
    version: "DOS",
    console: 'dos',
    core: 'dosbox',
    gameFile: "mario.zip",
    gamePath: "games/dos/mario.zip",
    description: "DOS 버전 마리오 게임"
  }
];

// 콘솔별 게임 필터링 함수
export const getGamesByConsole = (consoleId: string): GameConfig[] => {
  return gameSettings.filter(game => game.console === consoleId);
};

// 콘솔 정보 가져오기 함수
export const getConsoleConfig = (consoleId: string): ConsoleConfig | undefined => {
  return consoleConfigs.find(console => console.id === consoleId);
}; 