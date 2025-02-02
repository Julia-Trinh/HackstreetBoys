require('dotenv').config({ path: './config.env' }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recordRoutes = require('./routes/record'); 
const app = express();
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
