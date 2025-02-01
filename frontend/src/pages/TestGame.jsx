import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../components/useTypingGame';

const Game = () => {
    const [gameOver, setGameOver] = useState(false); // Track game-over state
    const [timeLimit, setTimeLimit] = useState(10);

    const checkVictory = () => {
        alert('Victory! You completed the text.');
    };

    const checkFailure = (currentIndex, totalLength) => {
        if (currentIndex >= totalLength) {
            return false; // No failure condition yet
        }
        // Failure condition: after 5 incorrect attempts
        return incorrectIndexes.length >= 5;
    };

    const { characters, currentIndex, incorrectIndexes, gameOver: gameStatus, elapsedTime } = useTypingGame(
        "test_text.txt", // Example text file
        checkVictory,
        checkFailure,
        timeLimit
    );

    useEffect(() => {
        if (gameStatus) {
            setGameOver(true);
        }
    }, [gameStatus]);

    return (
        <div>
            <h1>MiniGame 1</h1>
            <p>Time Remaining: {timeLimit - elapsedTime} seconds</p>
            {gameOver ? (
                <div>Game Over! You made too many mistakes.</div>
            ) : (
                <div>
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
                </div>
            )}
        </div>
    );
};

export default Game;


