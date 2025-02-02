const mongoose = require('mongoose');


//MONGO SCHEMA FOR RECORD
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    numberOfGamesPlayed: {
        type: Number,
        required: true
    }
},

{ timestamps: true });

const Record = mongoose.model('Record', userSchema, "records");
module.exports = Record;