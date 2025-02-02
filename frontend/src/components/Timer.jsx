import React, { useEffect, useState } from "react";

// Function to interpolate between two colors based on a percentage
const interpolateColor = (startColor, endColor, percentage) => {
    const start = parseInt(startColor.slice(1), 16);
    const end = parseInt(endColor.slice(1), 16);
    
    const rStart = (start >> 16) & 0xff;
    const gStart = (start >>  8) & 0xff;
    const bStart = start & 0xff;
    
    const rEnd = (end >> 16) & 0xff;
    const gEnd = (end >>  8) & 0xff;
    const bEnd = end & 0xff;

    const r = Math.round(rStart + (rEnd - rStart) * percentage);
    const g = Math.round(gStart + (gEnd - gStart) * percentage);
    const b = Math.round(bStart + (bEnd - bStart) * percentage);

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};

const Timer = ({ timeLimit, timeElapsed }) => {
    const [widthPercentage, setWidthPercentage] = useState(100);

    useEffect(() => {
        // Calculate the width percentage based on timeElapsed
        const adjustedTime = Math.max(0, timeLimit - (timeElapsed + 1));  // Make the bar shrink 1 second faster
        setWidthPercentage((adjustedTime / timeLimit) * 100);
    }, [timeElapsed, timeLimit]);

    // Interpolate color based on the percentage of time remaining
    const color = interpolateColor("#5C755E", "#9D1C1C", 1 - (widthPercentage / 100));

    return (
        <div style={{ position: "relative", width: "100%", height: "20px", backgroundColor: "#ccc", overflow: "hidden" }}>
            <div
                style={{
                    width: `${widthPercentage}%`,
                    height: "100%",
                    backgroundColor: color, // Set the color dynamically
                    margin: "0 auto",
                    transition: "width 1s linear, background-color 1s linear", // Smooth transition
                }}
            />
        </div>
    );
};

export default Timer;
