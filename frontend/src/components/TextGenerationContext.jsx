import React, { createContext, useContext, useState } from 'react';

const TextGenerationContext = createContext();


export const TextGenerationProvider = ({ children }) => {
    const [generatedText, setGeneratedText] = useState("");

    //Default difficulty is EASY, with 15 words to type. No number, no punctuations.
    const generateText = async (difficulty = 1, numWords = 15, sentence = false, personnalized = false, focusLetters) => {
        try {
            var prompt = "";
            var maxLetters = 5;
            var capitalize = false;
            var numbers = false;
            var punctuations = false;
            var complexeWords = false;

            switch (difficulty) {
                case 1:
                    maxLetters = 5;
                    capitalize = false;
                    numbers = false;
                    punctuations = false;
                    complexeWords = false;
                    break;
                case 2:
                    maxLetters = 8;
                    capitalize = true;
                    numbers = true;
                    punctuations = false;
                    complexeWords = false;
                    break;
                case 3:
                    maxLetters = 15;
                    capitalize = true;
                    numbers = true;
                    punctuations = true;
                    complexeWords = true;
                    break;
            }
            prompt = `generate ${sentence ? "a paragraph with random sentences of a total of " : "a list of a total of"} ${numWords} words with ${capitalize ? "some letter capitalization" : "no capitalization"}. ${numbers ? "Include numbers" : "Do not include numbers"}. ${punctuations ? "Include punctuations" : "No punctuations"}. ${complexeWords ? "Include contractions and hyphenated words" : "Do not include contractions or hyphenated words"}. ${personnalized ? `Emphasize on words containing the letters ${focusLetters}. ` : ""} Make sure all the words are gramatically correct and only include the content I asked. Do not include anything else. Separate the words of the paragraph with a single space. Make sure the result follows all my instructions.
            MAKE SURE the result contains EXACTLY ${numWords} words. MAKE SURE the words are separated by a single space. MAKE SURE the words are gramatically correct. MAKE SURE the respone uses EITHER programming terms OR western terms. NEVER give the exact same response twice in a row.`;

            console.log(prompt);

            const response = await fetch("http://localhost:5000/generate-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch text");
            }

            const data = await response.json();
            setGeneratedText(data.text);

            const writeResponse = await fetch("http://localhost:5000/write-file", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: data.text }), // Send the generated text here
            });
    
            if (!writeResponse.ok) {
                throw new Error("Failed to write text to file");
            }
    
            console.log("Text written to file successfully");
            
            return data.text;
        } catch (error) {
            console.error("Error fetching text:", error);
            setGeneratedText("Error generating text. Try again.");
            return "Error generating text. Try again.";
        }
    };

    return (
        <TextGenerationContext.Provider value={{ generateText, generatedText }}>
            {children}
        </TextGenerationContext.Provider>
    );
};

export const useTextGeneration = () => {
    const context = useContext(TextGenerationContext);
    if (!context) {
        //Remember to wrap the components where we use AI Gen with <TextGenerationProvider>
        throw new Error("useTextGeneration must be used within a TextGenerationProvider");
    }
    return context;
};
