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
    id: 'captain-commando-snes',
    name: "캡틴 코만도",
    version: "USA",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Captain Commando (USA).sfc",
    gamePath: "games/snes/Captain Commando (USA).sfc",
    description: "캡콤의 사이드 스크롤 액션 게임 - 미래 지구를 구하라!"
  },
  {
    id: 'fatal-fury-2-snes',
    name: "아랑전설 2",
    version: "USA",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Fatal Fury 2 (USA).sfc",
    gamePath: "games/snes/Fatal Fury 2 (USA).sfc",
    description: "SNK의 전설적인 격투 게임 시리즈"
  },
  {
    id: 'prince-persia-snes',
    name: "페르시아의 왕자",
    version: "USA",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Prince of Persia (USA).sfc",
    gamePath: "games/snes/Prince of Persia (USA).sfc",
    description: "클래식 액션 어드벤처 게임의 명작"
  },
  {
    id: 'street-fighter-alpha-2-snes',
    name: "스트리트 파이터 알파 2",
    version: "USA",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Street Fighter Alpha 2 (USA).sfc",
    gamePath: "games/snes/Street Fighter Alpha 2 (USA).sfc",
    description: "캡콤의 최고 격투 게임 - 알파 시리즈의 걸작"
  },
  {
    id: 'super-mario-rpg-snes',
    name: "슈퍼 마리오 RPG",
    version: "USA",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Super Mario RPG (USA).smc",
    gamePath: "games/snes/Super Mario RPG (USA).smc",
    description: "닌텐도와 스퀘어의 협작 RPG 명작 - 마리오의 첫 RPG"
  },
  {
    id: 'super-bomberman-5-snes',
    name: "슈퍼 봄버맨 5 골드",
    version: "Japan",
    console: 'snes',
    core: 'snes9x',
    gameFile: "Super Bomberman 5 Gold Cartridge (J) [!].smc",
    gamePath: "games/snes/Super Bomberman 5 Gold Cartridge (J) [!].smc",
    description: "허드슨의 봄버맨 시리즈 - 클래식 액션 퍼즐 게임"
  },
  {
    id: 'metal-slug-advance-gba',
    name: "메탈 슬러그 어드밴스",
    version: "USA",
    console: 'gba',
    core: 'mgba',
    gameFile: "Metal Slug Advance.gba",
    gamePath: "games/gba/Metal Slug Advance.gba",
    description: "SNK의 메탈 슬러그 시리즈 GBA 버전 - 액션 슈팅의 명작"
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