import React from 'react';
import { GameConfig, gameSettings } from '../types/GameConfig';
import './GameSelector.css';

interface GameSelectorProps {
  onGameSelect: (gameConfig: GameConfig) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onGameSelect }) => {
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
        
        {gameSettings.map((game, index) => (
          <button
            key={index}
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
      </div>
    </div>
  );
};

export default GameSelector; 