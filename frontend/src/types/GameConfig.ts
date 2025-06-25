export interface GameConfig {
  name: string;
  version: string;
  core: string;
  gameFile: string;
  description?: string;
}

export const gameSettings: GameConfig[] = [
  {
    name: "라이온 킹",
    version: "1994",
    core: "snes",
    gameFile: "lionk.smc",
    description: "디즈니의 라이온 킹 SNES 버전"
  },
  {
    name: "라이온 킹 (ZIP)",
    version: "1994", 
    core: "snes",
    gameFile: "lionk.ZIP",
    description: "디즈니의 라이온 킹 압축 버전"
  },
  {
    name: "라이온 킹 (미니)",
    version: "1994",
    core: "snes", 
    gameFile: "lionk_snes.zip",
    description: "디즈니의 라이온 킹 미니 버전"
  }
]; 