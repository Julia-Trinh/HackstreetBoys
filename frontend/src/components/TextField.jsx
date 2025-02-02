import React, { useState } from 'react';
import { TextGenerationProvider, useTextGeneration } from './TextGenerationContext';
import './TextField.css';

function TextField() {
    const [prompt, setPrompt] = useState('');
    const { generateText, generatedText } = useTextGeneration(); 

    const handleGenerate = async () => {
        const text = await generateText(3,50,false,false,false); 

    };

    return (
        <div>
            
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter your prompt"
            />
            <button onClick={handleGenerate}>Generate Text</button>
        <TextGenerationProvider>
            <textarea value={generatedText} readOnly placeholder="Generated text will appear here" />
        </TextGenerationProvider>
        </div>
    );
}

export default TextField;
