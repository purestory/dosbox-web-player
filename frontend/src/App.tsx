import React, { useState } from 'react';
import EmulatorJS from './components/EmulatorJS';
import GameSelector from './components/GameSelector';
import { GameConfig } from './types/GameConfig';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState<GameConfig | null>(null);

  const handleGameSelect = (gameConfig: GameConfig) => {
    console.log('🎮 Selected game:', gameConfig.name);
    setSelectedGame(gameConfig);
  };

  const handleBackToMenu = () => {
    // 게임을 완전히 종료하기 위해 페이지 새로고침
    window.location.reload();
  };

  const handleGameStart = () => {
    console.log('🎮 Game started successfully!');
  };

  const handleLoadComplete = () => {
    console.log('📦 Game loaded completely!');
  };

  if (selectedGame) {
    return (
      <div className="App">
        <button 
          className="back-button"
          onClick={handleBackToMenu}
          title="메뉴로 돌아가기"
        >
          ← 메뉴
        </button>
        <EmulatorJS
          gameConfig={selectedGame}
          color="#ff6b35"
          startOnLoaded={true}
          fullscreenOnLoaded={false}
          mouse={false}
          multitap={false}
          loadStateOnStart={false}
          pathtodata="./emulatorjs/"
          language=""
          onGameStart={handleGameStart}
          onLoadComplete={handleLoadComplete}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <GameSelector onGameSelect={handleGameSelect} />
    </div>
  );
}

export default App;
