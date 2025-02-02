import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StandOff from "./games/StandOff";
import SuddenDeath from "./games/SuddenDeath";
import RattleOff from "./games/RattleOff";
import MinigameParameters from "../components/MinigameParameters"
import "./MiniGameRush.css";


const GameMode = () => {
    const [username, setUsername] = useState("");
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [completedMinigames, setCompletedMinigames] = useState(0);
    const [difficulty, setDifficulty] = useState(1); // 1 | 2 | 3
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
            const MinigameIndex = Math.floor(Math.random() * minigames.length);
            const RandomGame = minigames[MinigameIndex];
            setCurrentGame(() => RandomGame);

            const params = MinigameParameters(MinigameIndex, difficulty);
            

            setTimeout(() => {
                setCurrentPhase("minigame");
            }, 5000);
        }
    }, [currentPhase, lives, hasPostedRecord]); // Add hasPostedRecord to dependencies

    useEffect(() =>{
        if (difficulty == 3) return;
        if (completedMinigames == 5) setDifficulty(2);
        if (completedMinigames == 10) setDifficulty(3);
    }, [completedMinigames]);

    const handleGameEnd = (won) => {
        if (won) {
            setScore((prev) => prev + 1);
        } else {
            setLives((prev) => prev - 1);
        }
        setCompletedMinigames((prev) => prev + 1);
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
                    <h2 className={textTheme}>Round: {completedMinigames}</h2>
                </div>
            </div>
        )}

        {/* Mini-Game UI - Visible only during gameplay */}
        {currentPhase === "minigame" && (
            <div className="minigame-container">
                {currentGame && React.createElement(currentGame, { onGameEnd: handleGameEnd,  gameDepth : completedMinigames})}
            </div>
        )}
    </div>
);
};

export default GameMode;
