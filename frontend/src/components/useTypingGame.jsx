import { useState, useEffect, useRef } from 'react';

export const useTypingGame = (textFileName, checkVictory, checkFailure, timeLimitInSeconds) => {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const [victory, setVictory] = useState(false);
  const [failure, setFailure] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const gameEnded = useRef(false); 
  const timerRef = useRef(null); 

  useEffect(() => {
    if (gameEnded.current) return;

    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (elapsedTime >= timeLimitInSeconds && !gameEnded.current) {
      endGame(false);
    }
  }, [elapsedTime, timeLimitInSeconds]);

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
      if (gameEnded.current) return;

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
    if (gameEnded.current) return;

    if (checkVictory && checkVictory(currentIndex, characters.length)) {
      endGame(true);
      return; 
    }

    if (checkFailure && checkFailure(currentIndex, characters.length)) {
      endGame(false);
    }
  }, [currentIndex, characters.length, checkVictory, checkFailure]);

  const endGame = (isVictory) => {
    if (gameEnded.current) return;

    gameEnded.current = true;
    clearInterval(timerRef.current);
    if (isVictory) setVictory(true);
    else setFailure(true);
  };

  return {
    characters,
    currentIndex,
    incorrectIndexes,
    gameVictory : victory,
    gameFailure : failure,
    elapsedTime,
  };
};
