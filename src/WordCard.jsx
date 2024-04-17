import React, { useState } from 'react';
import './index.css'; // Import CSS file for styles

const WordCard = ({ word }) => {
  const [showThai, setShowThai] = useState(false);

  const toggleCardFace = () => {
    setShowThai(!showThai);
  };

  return (
    <div className={`word-card-container ${showThai ? 'flipped' : ''}`} onClick={toggleCardFace}>
      <div className="word-card">
        <div className="word-card-front">
          <div className="font-bold word-card-text">{word.en}</div>
          <div className="word-card-text">English</div>
        </div>
        <div className="word-card-back">
          <div className="font-bold word-card-text">{word.th}</div>
          <div className="word-card-text">Thai</div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
