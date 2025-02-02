import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // to get the passed state
import StandOff from "./games/StandOff";
import SuddenDeath from "./games/SuddenDeath";
import TestGame from "./games/TestGame";

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

    return (
        <div>
            <h1>Welcome, {username}!</h1> {/* Display the username */}
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
