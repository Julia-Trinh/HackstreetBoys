import React, { useState, useEffect } from 'react';
import { useTypingGame } from '../../components/useTypingGame';
import Timer from '../../components/Timer';


const Game = ({onGameEnd, gameDepth}) => {
    const [gameOver, setGameOver] = useState(false);
    const [timeLimit, setTimeLimit] = useState(Math.max(30 - (gameDepth/3), 15));
    const [victory, setVictory] = useState(false);
    const [failure, setFailure] = useState(false);

    const checkVictory = (currentIndex, totalLength) => {
        return currentIndex === totalLength && totalLength > 0;
    };

    const checkFailure = (currentIndex, totalLength) => {
        if (currentIndex >= totalLength) {
            return false;
        }
        return incorrectIndexes.length >= 1;
    };

    const { characters, currentIndex, incorrectIndexes, gameVictory, gameFailure, elapsedTime } = useTypingGame(
            "gameText.txt", 
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
            <h1>SuddenDeath</h1>
            {gameOver ? (
                <div>
                {victory ? (<div>Success</div>):(<div>Failure</div>)}
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


