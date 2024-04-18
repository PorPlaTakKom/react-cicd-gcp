import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import Card from './components/Card';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
  const [words, setWords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const wordsCollectionRef = collection(db, "words");
    const fetchData = async () => {
      try {
        const data = await getDocs(wordsCollectionRef);
        const allWords = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWords(allWords);
        localStorage.setItem('words', JSON.stringify(allWords));
        console.log("Data fetched successfully:", allWords);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log("Component mounted.");
    const localWords = JSON.parse(localStorage.getItem('words'));
    if (localWords && localWords.length > 0) {
      setWords(localWords);
    } else {
      fetchData();
    }
    const unsubscribe = onSnapshot(wordsCollectionRef, (snapshot) => {
      const updatedWords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWords(updatedWords);
      localStorage.setItem('words', JSON.stringify(updatedWords));
      console.log("Real-time update received:", updatedWords);
    });
    return () => {
      unsubscribe();
      console.log("Listener unsubscribed.");
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? words.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAddWord = async (newWord) => {
    try {
      const docRef = await addDoc(collection(db, "words"), newWord);
      console.log("New word added with ID: ", docRef.id);
      setWords(prevWords => [...prevWords, newWord]);
    } catch (error) {
      console.error("Error adding word: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-72 overflow-hidden flex flex-col justify-center items-center">
        {activeIndex > 0 && (
          <Button onClick={handlePrev} direction="left" />
        )}
        {words.map((word, index) => (
          <div
            key={word.id}
            className={`absolute transition-transform duration-500 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: '80%',
              height: '90%',
              maxWidth: '300px',
              maxHeight: '400px',
              transform: `translateX(${(index - activeIndex) * 100}%)`,
            }}
          >
            <Card word={word} />
          </div>
        ))}
        {activeIndex < words.length - 1 && (
          <Button onClick={handleNext} direction="right" />
        )}
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Add New Word</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddWord={handleAddWord} />
    </div>
  );
}

export default App;
