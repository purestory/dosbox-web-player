import React, { useState } from 'react';
import { GameConfig, gameSettings, ConsoleConfig, consoleConfigs, getGamesByConsole } from '../types/GameConfig';
import './GameSelector.css';

interface GameSelectorProps {
  onGameSelect: (gameConfig: GameConfig) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onGameSelect }) => {
  const [selectedConsole, setSelectedConsole] = useState<string | null>(null);
  const [showConsoles, setShowConsoles] = useState(true);

  const handleConsoleSelect = (consoleId: string) => {
    setSelectedConsole(consoleId);
    setShowConsoles(false);
  };

  const handleBackToConsoles = () => {
    setSelectedConsole(null);
    setShowConsoles(true);
  };

  const getAvailableConsoles = () => {
    return consoleConfigs.filter(console => {
      const games = getGamesByConsole(console.id);
      return games.length > 0;
    });
  };

  return (
    <div className="game-selector">
      <div className="game-selector__header">
        <h1 className="game-selector__title">RETRO GAMES</h1>
        <p className="game-selector__subtitle">웹에서 즐기는 레트로 게임</p>
      </div>
      
      <div className="game-selector__menu">
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
        
        {showConsoles ? (
          // 콘솔 선택 화면
          <>
            <div className="game-selector__section-title">
              <h2>콘솔 선택</h2>
            </div>
            {getAvailableConsoles().map((console) => (
              <button
                key={console.id}
                className="game-selector__item console-item"
                onClick={() => handleConsoleSelect(console.id)}
              >
                <div className="game-selector__item-content">
                  <span className="console-icon">{console.icon}</span>
                  <span className="game-selector__item-name">{console.name}</span>
                  <span className="game-count">
                    {getGamesByConsole(console.id).length}개 게임
                  </span>
                </div>
                <p className="game-selector__item-description">{console.description}</p>
              </button>
            ))}
          </>
        ) : (
          // 게임 선택 화면
          <>
            <div className="game-selector__section-title">
              <button 
                className="back-button"
                onClick={handleBackToConsoles}
              >
                ← 콘솔 선택으로 돌아가기
              </button>
              <h2>
                {consoleConfigs.find(c => c.id === selectedConsole)?.name} 게임들
              </h2>
            </div>
            {selectedConsole && getGamesByConsole(selectedConsole).map((game) => (
              <button
                key={game.id}
                className="game-selector__item"
                onClick={() => onGameSelect(game)}
              >
                <div className="game-selector__item-content">
                  <span className="game-selector__item-name">{game.name}</span>
                  <span className="game-selector__item-version">{game.version}</span>
                </div>
                {game.description && (
                  <p className="game-selector__item-description">{game.description}</p>
                )}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GameSelector; 