import React, { useEffect, useState } from "react";

const Timer = ({ timeLimit, timeElapsed }) => {
    const [widthPercentage, setWidthPercentage] = useState(100);

    useEffect(() => {
        // Calculate the width percentage based on timeElapsed
        const adjustedTime = Math.max(0, timeLimit - (timeElapsed + 1));  // Make the bar shrink 1 second faster
        setWidthPercentage((adjustedTime / timeLimit) * 100);
    }, [timeElapsed, timeLimit]);

    return (
        <div style={{ position: "relative", width: "100%", height: "20px", backgroundColor: "#ccc", overflow: "hidden" }}>
            <div
                style={{
                    width: `${widthPercentage}%`,
                    height: "100%",
                    backgroundColor: "red",
                    margin: "0 auto",
                    transition: "width 1s linear", // Smooth transition over 1 second
                }}
            />
        </div>
    );
};

export default Timer;
