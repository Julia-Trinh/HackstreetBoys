import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-text", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
        });

        res.json({ text: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ error: "Failed to generate text" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config({ path: './config.env' }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recordRoutes = require('./routes/record'); 
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

app.use('/', recordRoutes); 

// Connect to MongoDB using the URI from the environment variable
const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri, {
    useNewUrlParser: true,         // Use the new connection string parser
    useUnifiedTopology: true      // Use the new Server Discovery and Monitoring engine
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
