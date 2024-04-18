import React from 'react';

const Button = ({ onClick, direction }) => {
  const buttonClasses = direction === 'left' ? 'left-0 ml-1 md:ml-10' : 'right-0 mr-1 md:mr-10';

  return (
    <button
      className={`absolute z-10 top-1/2 transform -translate-y-1/2 flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-600 hover:text-gray-900 ${buttonClasses}`}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>'}
    </button>
  );
};

export default Button;
