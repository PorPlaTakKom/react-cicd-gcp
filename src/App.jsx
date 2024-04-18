import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Card from './components/Card';
import Button from './components/Button';

function App() {
  const [words, setWords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIpadScreen, setIsIpadScreen] = useState(false);

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

    // Detect if the screen size is similar to iPad
    const handleResize = () => {
      setIsIpadScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize(); // Call initially
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      console.log("Listener unsubscribed.");
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? words.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`relative w-full ${isIpadScreen ? 'h-screen' : 'md:w-2/3 lg:w-1/2 xl:w-1/3'} h-72 overflow-hidden flex flex-col justify-center items-center`}>
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
              width: isIpadScreen ? '100%' : '80%', // Adjust width to fill available space
              height: '90%', // Adjust height to be greater than width
              maxWidth: '300px', // Max width for responsiveness
              maxHeight: '400px', // Max height for responsiveness
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
    </div>
  );  
}

export default App;
