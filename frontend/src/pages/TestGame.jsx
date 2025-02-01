import React from 'react';
import { useTypingGame } from '../components/useTypingGame';

const Game = () => {
  const onVictory = () => {
    alert('Victory! You completed the text.');
  };

  const { characters, currentIndex, incorrectIndexes } = useTypingGame('test_text.txt', onVictory);

  return (
    <div>
      <h1>Loaded Characters:</h1>
      <p>
        {characters.map((char, index) => (
          <span
            key={index}
            style={{
              color: currentIndex > index ? 'green' : 'black',
              backgroundColor: incorrectIndexes.includes(index) ? 'red' : 'transparent',
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Game;
