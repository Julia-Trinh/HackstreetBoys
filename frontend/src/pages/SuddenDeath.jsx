import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../components/useTypingGame';

const Game = () => {
    const [gameOver, setGameOver] = useState(false); // Track game-over state
    const [timeLimit, setTimeLimit] = useState(30);
    const [victory, setVictory] = useState(false);
    const [failure, setFailure] = useState(false);

    const checkVictory = (currentIndex, totalLength) => {
        return currentIndex === totalLength && totalLength > 0;
    };

    const checkFailure = (currentIndex, totalLength) => {
        if (currentIndex >= totalLength) {
            return false; // No failure condition yet
        }
        // Failure condition: SuddenDeath, after 1 incorrect attempt
        return incorrectIndexes.length >= 1;
    };

    const { characters, currentIndex, incorrectIndexes, gameVictory, gameFailure, elapsedTime } = useTypingGame(
            "SuddenDeath.txt", // Example text file
            checkVictory,
            checkFailure,
            timeLimit
        );

    useEffect(() => {
            if (gameVictory || gameFailure) {
                setGameOver(true);
                setVictory(gameVictory);
                setFailure(gameFailure);
            }
        }, [gameVictory, gameFailure]);

    return (
        <div>
            <h1>SuddenDeath</h1>
            <p>Time Remaining: {timeLimit - elapsedTime} seconds</p>
            {gameOver ? (
                <div>
                {victory ? (<div>Congrats!</div>):(<div>You suck!</div>)}
            </div>
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


