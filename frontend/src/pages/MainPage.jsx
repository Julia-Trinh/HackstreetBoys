import React from "react";
import "./MainPage.css";
import TextField from "../components/TextField";

function MainPage() {

    return (
        <div className="main-container">
        <>
             <h2>🎮 About Our Project</h2>
            <p>
                We are <strong>Hackstreet Boys</strong>, a team of passionate developers, designers, and problem solvers united by our love for innovation and technology.
                Our journey started with a shared vision: to create an engaging and immersive gaming experience that challenges both skill and strategy.
            </p>

            <h2>🕹️ MiniGame Rush</h2>
            <p>
                <strong>MiniGame Rush</strong> is a fast-paced, adrenaline-fueled experience where players must navigate through a series of thrilling mini-games, each with its own unique challenge.
                With limited lives and increasing difficulty, players must stay sharp, react quickly, and strategize to survive.
            </p>
            <p>
                Every game presents a new test of reflexes, logic, and endurance. Will you rise to the challenge and claim victory, or will you be knocked out before the final round?
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