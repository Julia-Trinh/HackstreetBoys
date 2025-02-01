const express = require('express');
const router = express.Router();
const Record = require('../models/record');

// GET TOP 5 RECORDS WITH longest timeToCompletion
router.get('/get_top_5_records', async (req, res) => {
    try {
        // Fetch records sorted by timeToCompletion in ascending order, and limit to 5
        const records = await Record.find()
            .sort({ timeToCompletion: -1 }) // Sort by timeToCompletion in ascending order
            .limit(5); // Limit to 5 records

        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;