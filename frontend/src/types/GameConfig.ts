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
    description: "디즈니의 라이온 킹 SNES 버전 - 정품 롬파일"
  }
]; 