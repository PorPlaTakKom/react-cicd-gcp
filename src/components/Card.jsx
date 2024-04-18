import React, { useState } from 'react';
import '../App.css'; // Import CSS file for animations

const Card = ({ word, flipEnabled = true }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      if (flipEnabled) {
        setIsFlipped(!isFlipped);
      }
    };
  
    return (
      <div className="relative w-full h-full" onClick={handleClick}>
        <div className={`absolute w-full h-full card ${isFlipped ? 'flip' : ''}`}>
          <div className="front bg-white p-4 shadow-md rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-center">{word.en}</h2>
          </div>
          <div className="back bg-white p-4 shadow-md rounded-lg flex flex-col justify-center items-center">
            <p className="text-gray-500 text-center">{word.th}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
