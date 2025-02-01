import React from 'react'
import { useEffect, useState } from 'react';

function Game() {

    useEffect(() => {
        const loadText = async () => {
            try {
                const response = await fetch("../assets/test_text.txt");
                const text = await response.text();
                setCharacters(text.split(""));
            } catch (error) {
                console.error("Error loading text file:", error);
            }
        };

        loadText();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Loaded Characters:</h1>
            <p className="mt-2 text-gray-700">
                {characters.map((char, index) => (
                    <span key={index} className="whitespace-pre">{char}</span>
                ))}
            </p>
        </div>
    );
}

export default Game;