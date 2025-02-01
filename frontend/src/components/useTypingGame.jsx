import { useState, useEffect } from 'react';

// Custom hook to handle typing game logic
export const useTypingGame = (textFileName, checkVictory, checkFailure, timeLimitInSeconds) => {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the character being typed correctly
  const [incorrectIndexes, setIncorrectIndexes] = useState([]); // Track incorrect character indexes
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {

    if (gameOver) return;

    // Start the timer when the game begins
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup the timer when the game ends
    return () => clearInterval(timer);
  }, [gameOver]);

  // Check if the time limit is exceeded
  useEffect(() => {
    if (elapsedTime >= timeLimitInSeconds && !(gameOver)) {
      setGameOver(true); // End the game if the time limit is reached
      setElapsedTime(timeLimitInSeconds);
      alert("Game Over! You failed.");
    }
  }, [elapsedTime, timeLimitInSeconds]);

  useEffect(() => {
    // Load the text file and split it into characters
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
    // Event listener for keypresses
    const handleKeyDown = (event) => {
      if (gameOver) return; // Stop processing if game is over

      if (event.key.length === 1) {
        // Check if the key is correct and update the currentIndex or highlight it as incorrect
        if (characters[currentIndex] && event.key === characters[currentIndex]) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          // Reset the background color for the correct character
          setIncorrectIndexes((prev) => prev.filter((index) => index !== currentIndex));
        } else {
          // If the key is incorrect, highlight the character in red
          setIncorrectIndexes((prev) => [...prev, currentIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [characters, currentIndex, gameOver]);

  useEffect(() => {
    // Call checkFailure function if a failure condition is met
    if (checkFailure && checkFailure(currentIndex, characters.length) && !(gameOver)) {
      setGameOver(true); // Mark the game as over
      alert("Game Over! You failed.");
      // Optionally, you can reset the game here if you like:
      // resetGame();
    }

    // Trigger checkVictory callback only when the last character is typed correctly
    if (characters.length > 0 && currentIndex === characters.length && checkVictory) {
      checkVictory(); // Call the callback passed as a parameter
    }
  }, [currentIndex, characters.length, checkVictory, checkFailure]);

  // Return the necessary state and functions for the game
  return {
    characters,
    currentIndex,
    incorrectIndexes,
    gameOver,
    elapsedTime,
  };
};
