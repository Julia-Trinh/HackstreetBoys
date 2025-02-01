import React, { useState } from "react";
import Logo from "../components/SiteLogo.jsx";
import "./UserName.css";


function Username() {
    const [username, setUsername] = useState("");

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = () => {
        alert(`Username submitted: ${username}`);
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
