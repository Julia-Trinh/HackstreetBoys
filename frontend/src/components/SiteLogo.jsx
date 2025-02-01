import React from "react";
import "./SiteLogo.css";
import logoImage from "./output.png"; // Adjust path based on location

function Logo() {
    return (
        <div>
            <img src={logoImage} alt="Logo Image" />
        </div>
    );
}

export default Logo;
