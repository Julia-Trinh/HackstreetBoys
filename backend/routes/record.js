const express = require('express');
const router = express.Router();
const Record = require('../models/record');


router.get('/get_top_15_records', async (req, res) => {
    try {
        const records = await Record.find()
            .sort({ numberOfVictories: -1 }) 
            .limit(15); 


        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add_record', async (req, res) => {
    const { username, numberOfVictories } = req.body;

    if (!username || numberOfVictories === undefined) {
        const missingFields = [];

        if (!username) missingFields.push('username');
        if (numberOfVictories === undefined) missingFields.push('numberOfVictories');


        
        return res.status(400).json({
            message: "The following fields are required:",
            missingFields: missingFields,
            username: username || null, 
            numberOfVictories: numberOfVictories || null 

        });
    }

    try {
        const newRecord = new Record({
            username,
            numberOfVictories
        });

        await newRecord.save();

        res.status(201).json({ message: "Record added successfully", record: newRecord });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
