import React, { useState, useEffect } from "react";
import StandOff from "./StandOff";
import SuddenDeath from "./SuddenDeath";
import TestGame from "./TestGame";

const GameMode = () => {
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [currentPhase, setCurrentPhase] = useState("intermediary"); // "intermediary" | "minigame"
    const [currentGame, setCurrentGame] = useState(null);

    const minigames = [TestGame, SuddenDeath, StandOff];

    useEffect(() => {
        if (lives <= 0) return; // Stop game when out of lives

        if (currentPhase === "intermediary") {
            setTimeout(() => {
                startNewMinigame();
            }, 5000);
        }
    }, [currentPhase, lives]);

    const startNewMinigame = () => {
        const RandomGame = TestGame;//minigames[Math.floor(Math.random() * minigames.length)];
        setCurrentGame(() => RandomGame);
        setCurrentPhase("minigame");
    };

    const handleGameEnd = (won) => {
        if (won) {
            setScore((prev) => prev + 1);
        } else {
            setLives((prev) => prev - 1);
        }
        setCurrentPhase("intermediary");
    };

    if (lives <= 0) {
        return <h1>Game Over! Final Score: {score}</h1>;
    }

    return (
        <div>
            {currentPhase === "intermediary" ? (
                <div>
                    <h2>Lives: {lives}</h2>
                    <h2>Score: {score}</h2>
                    <p>Get ready for the next game!</p>
                </div>
            ) : (
                currentGame && React.createElement(currentGame, { onGameEnd: handleGameEnd })
            )}
        </div>
    );
};

export default GameMode;
