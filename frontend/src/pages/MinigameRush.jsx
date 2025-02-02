import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // to get the passed state
import StandOff from "./games/StandOff";
import SuddenDeath from "./games/SuddenDeath";
import TestGame from "./games/TestGame";
import "./MiniGameRush.css";


const GameMode = () => {
    const [username, setUsername] = useState("");
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [currentPhase, setCurrentPhase] = useState("intermediary"); // "intermediary" | "minigame"
    const [currentGame, setCurrentGame] = useState(null);

    // Get username from location state
    const location = useLocation();
    const passedUsername = location.state?.username;

    // Set the username in state
    useEffect(() => {
        if (passedUsername) {
            setUsername(passedUsername);
        }
    }, [passedUsername]);

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
        const RandomGame = minigames[Math.floor(Math.random() * minigames.length)];
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

    const boxTheme = currentPhase === "intermediary" 
    ? (lives === 3 ? "box-green" : lives === 2 ? "box-yellow" : "box-red")
    : ""; // No theme while game is running

const textTheme = currentPhase === "intermediary"
    ? (lives === 3 ? "text-green" : lives === 2 ? "text-yellow" : "text-red")
    : ""; // No theme while game is running

return (
    <div className="game-container">
        {/* Intermediary UI - Visible only between rounds */}
        {currentPhase === "intermediary" && (
            <div className={`intermediary-container ${boxTheme}`}>
                <h1 className={textTheme}>Welcome, {username}!</h1>
                <div>
                    <h2 className={textTheme}>Lives: {lives}</h2>
                    <h2 className={textTheme}>Score: {score}</h2>
                    <p className={textTheme}>Get ready for the next game!</p>
                </div>
            </div>
        )}

        {/* Mini-Game UI - Visible only during gameplay */}
        {currentPhase === "minigame" && (
            <div className="minigame-container">
                {currentGame && React.createElement(currentGame, { onGameEnd: handleGameEnd })}
            </div>
        )}
    </div>
);

    
};

export default GameMode;
