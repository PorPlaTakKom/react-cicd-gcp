import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import './App.css'; // Import the CSS file
import WordCard from './WordCard';

function App() {
  const [words, setWords] = useState([]);
  const [flippedWords, setFlippedWords] = useState({});
  const wordsCollectionRef = collection(db, "words");

  const getWords = async () => {
    const data = await getDocs(wordsCollectionRef);
    let allWords = data.docs.map(item => ({ ...item.data(), id: uuidv4() })); // Generate unique ID for each word
    setWords(allWords);
    // Initialize flippedWords object with false for each word
    const initialFlippedWords = {};
    allWords.forEach(word => {
      initialFlippedWords[word.id] = false;
    });
    setFlippedWords(initialFlippedWords);
  };

  useEffect(() => {
    getWords();
  }, []);

  const handleCardClick = (id) => {
    console.log(id)
    setFlippedWords(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Word List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
          <div key={word.id} className="w-full md:w-1/2 lg:w-1/3">
            <WordCard word={word} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
