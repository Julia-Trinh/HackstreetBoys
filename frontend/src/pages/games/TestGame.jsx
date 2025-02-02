import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../../components/useTypingGame';
import Timer from '../../components/Timer';

const TestGame = ({onGameEnd}) => {
    const [gameOver, setGameOver] = useState(false);
    const [timeLimit, setTimeLimit] = useState(15);
    const [victory, setVictory] = useState(false);
    const [failure, setFailure] = useState(false);

    const checkVictory = (currentIndex, totalLength) => {
        return currentIndex === totalLength && totalLength > 0;
    };

    const checkFailure = (currentIndex, totalLength) => {
        if (currentIndex >= totalLength) {
            return false;
        }
        return incorrectIndexes.length >= 5;
    };

    const { characters, currentIndex, incorrectIndexes, gameVictory, gameFailure, elapsedTime } = useTypingGame(
        "test_text.txt",
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

    useEffect(() => {
        if (!(gameOver)) return;
        const timer = setTimeout(() => {
            onGameEnd(victory);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, [gameOver]);

    return (
        <div>
            <Timer timeLimit={timeLimit} timeElapsed={elapsedTime}/>
            <h1>MiniGame 1</h1>
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

export default TestGame;


