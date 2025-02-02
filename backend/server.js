require('dotenv').config({ path: './config.env' }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require("fs");
const recordRoutes = require('./routes/record'); 
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API Configuration
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

app.post("/write-file", (req, res) => {
    const { text } = req.body;

    // Ensure text is a string before writing to file
    if (typeof text !== "string") {
        return res.status(400).json({ message: "Invalid input: text must be a string" });
    }

    fs.writeFile("../frontend/public/assets/gameText.txt", text, "utf8", (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing file", error: err });
        }
        res.json({ message: "File successfully overwritten!" });
    });
});

// Routes
app.use('/', recordRoutes);

// MongoDB Connection
const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Start Server (Only Once)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
