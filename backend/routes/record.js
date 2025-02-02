const express = require('express');
const router = express.Router();
const Record = require('../models/record');

router.get('/get_top_5_records', async (req, res) => {
    try {
        const records = await Record.find()
            .sort({ numberOfGamesPlayed: 1 })
            .limit(5); // Limit to 5 records

        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;