import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserName.css";

function Username() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate(); // React Router's useNavigate hook

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = () => {
        if (username) {
            // Navigate to /minigamrush and pass the username as state
            navigate("/minigameRush", { state: { username } });
        } else {
            alert("Please enter a username");
        }
    };

    return (
        <div className="container">
            <h1 className="siteName">PLEASE ENTER YOUR USERNAME:</h1>
            <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="usernameInput"
            />
            <button onClick={handleSubmit} className="submitButton">Submit</button>
        </div>
    );
}

export default Username;
