import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onAddWord }) => {
  const [english, setEnglish] = useState('');
  const [thai, setThai] = useState('');

  const handleAddWord = () => {
    if (english.trim() === '' || thai.trim() === '') {
      alert('Please fill in both English and Thai words.');
      return;
    }
    onAddWord({ en: english, th: thai });
    onClose();
    setEnglish('');
    setThai('');
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Word</h2>
        <input
          type="text"
          placeholder="English"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thai"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={thai}
          onChange={(e) => setThai(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleAddWord}>Add</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
