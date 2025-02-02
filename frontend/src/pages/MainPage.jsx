import React from "react";
import "./MainPage.css";
import TextField from "../components/TextField";

function MainPage() {

    return (
        <div className="main-container">
        <>
             <h2>🎮 About Our Project</h2>
            <p>
                We are <strong>Hackstreet Boys</strong>, a team of passionate developers who are making their first foray into game development.
                Our journey started with a shared vision: to create an entertaining game with our own creative twist on the formula.
            </p>

            <h2>🕹️ MiniGame Rush</h2>
            <p>
                <strong>MiniGame Rush</strong> is a fast-paced, constantly accelerating mini-game gauntlet, each with their unique challenges.
                With limited lives and increasing difficulty, players must stay sharp, react quickly, and type their heart out to achieve a high score on the leaderboard.
            </p>
            <p>
                Every game presents a new test of reflexes, grit, and endurance. Will you rise to the challenge and claim victory, or will you have your keycaps knocked clean off?
            </p>

            <h2>🤝 Meet the Team</h2>
            <ul className="team-list">
                <li>🔹 <strong>Hoang Vu Luu</strong></li>
                <li>🔹 <strong>Haichuan Li</strong></li>
                <li>🔹 <strong>Julia Trinh</strong></li>
                <li>🔹 <strong>Jeremie Beaudoin</strong></li>
            </ul>
        </>
        </div>
    )


}

export default MainPage;