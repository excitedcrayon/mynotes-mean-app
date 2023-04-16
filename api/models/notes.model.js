const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        trim: true
    },
    text: {
        type: String,
        minlength: 1,
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = { Notes }