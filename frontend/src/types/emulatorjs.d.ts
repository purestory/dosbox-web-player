declare global {
  interface Window {
    EJS_player: string;
    EJS_gameUrl: string;
    EJS_core: string;
    EJS_gameName: string;
    EJS_color: string;
    EJS_startOnLoaded: boolean;
    EJS_fullscreenOnLoaded: boolean;
    EJS_mouse: boolean;
    EJS_multitap: boolean;
    EJS_loadStateOnStart: boolean;
    EJS_pathtodata: string;
    EJS_language: string;
    EJS_onGameStart?: () => void;
    EJS_onLoadComplete?: () => void;
    EJS_onSaveState?: (data: any) => void;
    EJS_onLoadState?: (loadStateFn: any, currentDisc: any) => void;
  }
}

export {}; 