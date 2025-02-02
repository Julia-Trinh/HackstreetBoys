import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../../components/useTypingGame';
import Timer from '../../components/Timer';

const Game = ({onGameEnd}) => {
    const delay = Math.ceil(Math.random() * 3) * 1000 + 1000; // Random delay between 1 and 4 seconds
    let countdown = 3;
    const [gameOver, setGameOver] = useState(false);
    const [timeLimit, setTimeLimit] = useState((delay / 1000) + countdown);
    const [showGame, setShowGame] = useState(false);
    const [victory, setVictory] = useState(false);
    const [failure, setFailure] = useState(false);

    // Show the game after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGame(true);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    const checkVictory = (currentIndex, totalLength) => {
        return currentIndex === totalLength && totalLength > 0;
    };

    const checkFailure = (currentIndex, totalLength) => {
        return incorrectIndexes.length >= 100; // Fail if too many mistakes
    };

    const { characters, currentIndex, incorrectIndexes, gameVictory, gameFailure, elapsedTime } = useTypingGame(
            "StandOff.txt", // Example text file
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
        <div className="game-container">
            {!showGame ? (
                <h1 className="loading-text">Get Ready...</h1>
            ) : (
                <>  
                            <Timer timeLimit={timeLimit} timeElapsed={elapsedTime}/>

                    <h1>Stand-Off</h1>
                    
                    
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
                </>
            )}
        </div>
    );
};

export default Game;
