import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../components/useTypingGame';

const Game = () => {
    let delay = 2000; // 5-second delay
    let countdown = 5;
    const [gameOver, setGameOver] = useState(false);
    const [timeLimit, setTimeLimit] = useState((delay / 1000) + countdown);
    const [showGame, setShowGame] = useState(false);

    // Show the game after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGame(true);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    const checkVictory = () => {
        alert('🎉 Victory! You completed the text.');
    };

    const checkFailure = (currentIndex, totalLength) => {
        return incorrectIndexes.length >= 100; // Fail if too many mistakes
    };

    const { characters, currentIndex, incorrectIndexes, gameOver: gameStatus, elapsedTime, inputRef } = useTypingGame(
        "StandOff.txt",
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
        <div className="game-container">
            {!showGame ? (
                <h1 className="loading-text">Get Ready...</h1>
            ) : (
                <>
                    <h1>Stand-Off</h1>
                    <p className="timer"> Time Remaining: {timeLimit - elapsedTime} seconds</p>
                    {gameOver ? (
                        <div className="game-over"> Game Over! You made too many mistakes.</div>
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
                </>
            )}
        </div>
    );
};

export default Game;
