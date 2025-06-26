import React, { useEffect, useRef } from 'react';
import '../types/emulatorjs.d.ts';
import { GameConfig } from '../types/GameConfig';

interface EmulatorJSProps {
  gameConfig: GameConfig;
  gameUrl?: string;
  core?: string;
  gameName?: string;
  color?: string;
  startOnLoaded?: boolean;
  fullscreenOnLoaded?: boolean;
  mouse?: boolean;
  multitap?: boolean;
  loadStateOnStart?: boolean;
  pathtodata?: string;
  language?: string;
  onGameStart?: () => void;
  onLoadComplete?: () => void;
  onSaveState?: (data: any) => void;
  onLoadState?: (loadStateFn: any, currentDisc: any) => void;
}

const EmulatorJS: React.FC<EmulatorJSProps> = ({
  gameConfig,
  gameUrl,
  core,
  gameName,
  color = '#ff6b35',
  startOnLoaded = true,
  fullscreenOnLoaded = false,
  mouse = false,
  multitap = false,
  loadStateOnStart = false,
  pathtodata = './emulatorjs/',
  language = '',
  onGameStart,
  onLoadComplete,
  onSaveState,
  onLoadState,
}) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IndexedDB 충돌 방지를 위한 임시 해결책
    const originalIndexedDB = window.indexedDB;
    const originalIDBOpenDBRequest = window.IDBOpenDBRequest;
    
    // EmulatorJS IndexedDB 오류 방지
    const safeIndexedDB = {
      ...originalIndexedDB,
      open: function(name: string, version?: number) {
        console.log('IndexedDB open request:', name, version);
        try {
          return originalIndexedDB.open(name, version);
        } catch (error) {
          console.warn('IndexedDB open failed, creating mock:', error);
          // 실패 시 mock 객체 반환
          return {
            onsuccess: null,
            onerror: null,
            onupgradeneeded: null,
            result: null,
            error: null,
            readyState: 'done'
          } as any;
        }
      }
    };
    
    // 임시로 안전한 IndexedDB로 교체
    (window as any).indexedDB = safeIndexedDB;
    
    // 언어팩 요청 차단
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && url.includes('localization/')) {
        console.log('Blocked language pack request:', url);
        return Promise.reject(new Error('Language pack blocked'));
      }
      return originalFetch.apply(this, args);
    };

    // 브라우저 언어 감지 비활성화
    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: 'en'
    });
    Object.defineProperty(navigator, 'languages', {
      writable: true,
      value: ['en']
    });
    
    // IndexedDB 관련 오류 전역 처리
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      if (message.includes('IndexedDB') || message.includes('IDBDatabase') || message.includes('object stores')) {
        console.warn('IndexedDB error suppressed:', ...args);
        return;
      }
      originalConsoleError.apply(console, args);
    };
    
    // Promise rejection 처리
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.message && 
          (event.reason.message.includes('IndexedDB') || 
           event.reason.message.includes('IDBDatabase') ||
           event.reason.message.includes('object stores'))) {
        console.warn('IndexedDB promise rejection suppressed:', event.reason);
        event.preventDefault();
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // EmulatorJS 설정
    window.EJS_player = '#game';
    window.EJS_gameUrl = gameUrl || `./${gameConfig.gamePath}`;
    window.EJS_core = core || gameConfig.core;
    window.EJS_gameName = gameName || gameConfig.name;
    window.EJS_color = color;
    window.EJS_startOnLoaded = startOnLoaded;
    window.EJS_fullscreenOnLoaded = fullscreenOnLoaded;
    window.EJS_mouse = mouse;
    window.EJS_multitap = multitap;
    window.EJS_loadStateOnStart = loadStateOnStart;
    window.EJS_pathtodata = pathtodata;
    window.EJS_language = language;

    // 콜백 설정
    window.EJS_onGameStart = () => {
      console.log('Game started');
      onGameStart?.();
    };

    window.EJS_onLoadComplete = () => {
      console.log('Game loaded completely');
      onLoadComplete?.();
    };

    window.EJS_onSaveState = onSaveState;
    window.EJS_onLoadState = onLoadState;

    // EmulatorJS 로더 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = './emulatorjs/loader.js';
    script.async = true;
    script.onload = () => {
      console.log('EmulatorJS loader loaded');
    };
    script.onerror = () => {
      console.error('Failed to load EmulatorJS');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      window.fetch = originalFetch;
      // IndexedDB 원복
      (window as any).indexedDB = originalIndexedDB;
      // 오류 핸들러 원복
      console.error = originalConsoleError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [gameUrl, core, gameName, color, startOnLoaded, fullscreenOnLoaded, mouse, multitap, loadStateOnStart, pathtodata, language, onGameStart, onLoadComplete, onSaveState, onLoadState]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <div id="game" ref={gameRef} style={{ width: '100%', height: '100%' }} />
      
      <style>{`
        /* EmulatorJS 로딩 스피너 숨기기 */
        .ejs_loading_text {
          display: none !important;
        }
        
        /* 로딩 중 표시되는 모든 요소 숨기기 */
        .ejs_parent::before,
        .ejs_parent::after {
          display: none !important;
        }
        
        /* 로딩 애니메이션 관련 요소들 숨기기 */
        .ejs_parent [class*="loading"],
        .ejs_parent [class*="spinner"],
        .ejs_parent [id*="loading"],
        .ejs_parent [id*="spinner"] {
          display: none !important;
        }
        
        /* 시작 버튼도 숨기기 (자동 시작) */
        .ejs_start_button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default EmulatorJS; 