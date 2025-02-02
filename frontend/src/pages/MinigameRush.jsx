import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StandOff from "./games/StandOff";
import SuddenDeath from "./games/SuddenDeath";
import RattleOff from "./games/RattleOff";

const GameMode = () => {
    const [username, setUsername] = useState("");
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [currentPhase, setCurrentPhase] = useState("intermediary"); // "intermediary" | "minigame"
    const [currentGame, setCurrentGame] = useState(null);
    const [hasPostedRecord, setHasPostedRecord] = useState(false); // State to track if record has been posted

    // Get username from location state
    const location = useLocation();
    const passedUsername = location.state?.username;

    // Set the username in state
    useEffect(() => {
        if (passedUsername) {
            setUsername(passedUsername);
        }
    }, [passedUsername]);

    const minigames = [RattleOff, SuddenDeath, StandOff];

    useEffect(() => {
        if (lives <= 0 || hasPostedRecord) return; // Stop game when out of lives or if the record has been posted

        if (currentPhase === "intermediary") {
            setTimeout(() => {
                startNewMinigame();
            }, 5000);
        }
    }, [currentPhase, lives, hasPostedRecord]); // Add hasPostedRecord to dependencies

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

    // Post the record when the game is over
    const postRecord = async (username, numberOfVictories) => {
        try {
            const response = await axios.post("http://localhost:5000/add_record", {
                username,
                numberOfVictories
            });
            console.log("Record added:", response.data);
        } catch (err) {
            console.error("Error posting record:", err);
        }
    };

    useEffect(() => {
        if (lives <= 0 && !hasPostedRecord) {
            postRecord(username, score);
            setHasPostedRecord(true); // Mark record as posted to prevent duplicate requests
        }
    }, [lives, username, score, hasPostedRecord]);

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
