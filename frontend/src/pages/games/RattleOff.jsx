import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../../components/useTypingGame';
import Timer from '../../components/Timer';


const RattleOff = ({onGameEnd, gameDepth}) => {
    const [gameOver, setGameOver] = useState(false); // Track game-over state
    const safeGameDepth = Number.isFinite(gameDepth) ? gameDepth : 0;
    const [timeLimit, setTimeLimit] = useState(Math.max(15 - (safeGameDepth / 3), 10));
    const [victory, setVictory] = useState(false);
    const [failure, setFailure] = useState(false);

    

    const checkVictory = (currentIndex, totalLength) => {
        return currentIndex === totalLength && totalLength > 0;
    };

    const checkFailure = (currentIndex, totalLength) => {
        if (currentIndex >= totalLength) {
            return false; // No failure condition yet
        }
        // Failure condition: after 5 incorrect attempts
        return incorrectIndexes.length >= 5;
    };

    const { characters, currentIndex, incorrectIndexes, gameVictory, gameFailure, elapsedTime } = useTypingGame(
        "gameText.txt", // Example text file
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
            <h1>Rattle Off</h1>
            <Timer timeLimit={timeLimit} timeElapsed={elapsedTime}/>
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

export default RattleOff;


