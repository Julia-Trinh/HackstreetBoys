import { useState, useEffect } from 'react';


export const useTypingGame = (textFileName, onVictory) => {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);

  useEffect(() => {
    const loadText = async () => {
      try {
        const response = await fetch(`/assets/${textFileName}`);
        const text = await response.text();
        setCharacters(text.split(""));
      } catch (error) {
        console.error("Error loading text file:", error);
      }
    };

    loadText();
  }, [textFileName]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1) {
        if (characters[currentIndex] && event.key === characters[currentIndex]) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setIncorrectIndexes((prev) => prev.filter((index) => index !== currentIndex));
        } else {
          setIncorrectIndexes((prev) => [...prev, currentIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [characters, currentIndex]);

  useEffect(() => {
    if (characters.length > 0 && currentIndex === characters.length && onVictory) {
      onVictory();
    }
  }, [currentIndex, characters.length, onVictory]);

  return {
    characters,
    currentIndex,
    incorrectIndexes,
  };
};
